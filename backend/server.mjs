import express from 'express';
import nodemailer from 'nodemailer';

/**
 * Redtekk contact API.
 *
 * A single POST /api/contact endpoint that validates a contact-form
 * submission and forwards it by email. Designed to run on Railway (reads
 * PORT and trusts the proxy) but works locally with zero configuration:
 * without SMTP credentials it logs submissions to the console instead of
 * sending mail, so the frontend can be developed against it directly.
 */

const PORT = Number(process.env.PORT ?? 3000);

/** Comma-separated list of origins allowed to call the API. */
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ??
  'http://localhost:4200,http://localhost:8080,https://redtekk.com,https://www.redtekk.com'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

/** Where submissions are delivered. */
const CONTACT_TO = process.env.CONTACT_TO ?? 'hello@redtekk.com';
const CONTACT_FROM = process.env.CONTACT_FROM ?? 'Redtekk Website <no-reply@redtekk.com>';

/** Simple in-memory rate limit: max N submissions per IP per window. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map();

const PROJECT_TYPES = new Set(['website', 'web-app', 'e-commerce', 'ai', 'other']);

const app = express();

// Railway (and most PaaS) terminate TLS at a proxy; needed for correct req.ip.
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

// --- CORS ---------------------------------------------------------------

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

// --- helpers ------------------------------------------------------------

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip) ?? [];
  const recent = bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

// Drop stale rate-limit buckets so memory stays flat.
setInterval(() => {
  const now = Date.now();

  for (const [ip, bucket] of rateBuckets) {
    const recent = bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

    if (recent.length === 0) {
      rateBuckets.delete(ip);
    } else {
      rateBuckets.set(ip, recent);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body) {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Invalid payload.' };
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  const projectType = String(body.projectType ?? '').trim();
  const company = String(body.company ?? '').trim();

  if (name.length < 2 || name.length > 100) {
    return { error: 'Please tell us your name.' };
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return { error: 'Please use a valid email address.' };
  }

  if (message.length < 10 || message.length > 5000) {
    return { error: 'Please write a few sentences about your project.' };
  }

  if (projectType && !PROJECT_TYPES.has(projectType)) {
    return { error: 'Invalid project type.' };
  }

  return { data: { name, email, message, projectType, company } };
}

function buildTransport() {
  if (!process.env.SMTP_HOST) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

const transport = buildTransport();

async function deliver(submission) {
  const projectTypeLine = submission.projectType ? `Project type: ${submission.projectType}\n` : '';
  const text =
    `New contact form submission from redtekk.com\n\n` +
    `Name: ${submission.name}\n` +
    `Email: ${submission.email}\n` +
    projectTypeLine +
    `\nMessage:\n${submission.message}\n`;

  if (!transport) {
    console.log('[contact] SMTP not configured, logging submission instead:\n' + text);
    return;
  }

  await transport.sendMail({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    replyTo: `${submission.name} <${submission.email}>`,
    subject: `New inquiry from ${submission.name}`,
    text,
  });
}

// --- routes ---------------------------------------------------------------

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  try {
    if (isRateLimited(req.ip)) {
      res.status(429).json({ error: 'Too many messages. Please try again later.' });
      return;
    }

    const result = validate(req.body);

    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    // Honeypot: real visitors never see the "company" field. Pretend success
    // so bots learn nothing.
    if (result.data.company) {
      res.json({ ok: true });
      return;
    }

    await deliver(result.data);
    res.json({ ok: true });
  } catch (error) {
    console.error('[contact] delivery failed:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

app.listen(PORT, () => {
  console.log(`Redtekk contact API listening on port ${PORT}`);
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
  console.log(transport ? 'SMTP configured, mail delivery enabled.' : 'SMTP not configured, submissions are logged to console.');
});

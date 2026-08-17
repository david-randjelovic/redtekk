# Redtekk contact API

Small Express service that receives contact-form submissions from redtekk.com and forwards them by email.

## Endpoints

- `POST /api/contact` — body: `{ name, email, message, projectType?, company? }`. `company` is a honeypot field and must stay empty.
- `GET /health` — liveness check.

## Local development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`. Without SMTP credentials submissions are logged to the console instead of emailed, so the frontend works against it with zero setup.

## Deployment (Railway)

1. Create a new Railway service from this folder.
2. Set the environment variables from `.env.example` (SMTP via Brevo or any provider).
3. Railway injects `PORT` automatically.
4. After deploying, update `CONTACT_API_URL` in the frontend (`src/app/services/contact-api.service.ts`) to the Railway URL.

## Built-in protections

- Strict CORS allowlist (`ALLOWED_ORIGINS`)
- Input validation and length limits (32kb body cap)
- Honeypot field: bot submissions get a fake success and are dropped
- In-memory rate limit: 5 submissions per IP per 10 minutes

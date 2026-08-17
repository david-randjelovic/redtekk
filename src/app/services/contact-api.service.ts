import { Injectable } from '@angular/core';

/**
 * Contact form submissions go to Formspree over AJAX (Accept: application/json),
 * so the visitor stays on our page and we show an in-page success state instead
 * of being redirected to formspree.io.
 */
const CONTACT_ENDPOINT = 'https://formspree.io/f/mnjeenpl';

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  /** Optional project category from the form select. */
  readonly projectType: string;
  /** Honeypot field: real visitors never fill it. */
  readonly company: string;
}

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  public async send(payload: ContactPayload): Promise<void> {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        projectType: payload.projectType,
        message: payload.message,
        _subject: `New project inquiry from ${payload.name}`,
        // Formspree silently drops the submission if its honeypot is filled.
        _gotcha: payload.company,
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        errors?: { message?: string }[];
      } | null;

      const message = body?.errors
        ?.map((item) => item.message)
        .filter(Boolean)
        .join(' ');

      throw new Error(message || 'Request failed');
    }
  }
}

import { SafeHtml } from '@angular/platform-browser';

export interface ServiceSummary {
  /** Slug used to link to the matching service detail page (/services/:id). */
  id: string;
  /** Two-digit ordinal, e.g. "01". */
  num: string;
  /** Single-word action label, e.g. "Identity". */
  label: string;
  /** Card title. */
  title: string;
  /** Short description shown on the card. */
  short: string;
  /** Pre-sanitized inline SVG markup for the icon. */
  icon: SafeHtml;
}

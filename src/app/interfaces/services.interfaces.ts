import { SafeHtml } from '@angular/platform-browser';

export interface ServiceDetail {
  /** Stable identifier used to open the matching detail modal. */
  id: string;
  /** Two-digit ordinal, e.g. "01". */
  num: string;
  /** Single-word action label, e.g. "Identity". */
  label: string;
  /** Card title. */
  title: string;
  /** Short description shown on the card. */
  short: string;
  /** Longer lead paragraph shown in the detail modal. */
  intro: string;
  /** Bullet list of what the service includes. */
  includes: string[];
  /** Pre-sanitized inline SVG markup for the icon. */
  icon: SafeHtml;
}

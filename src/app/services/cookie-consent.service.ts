import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

export interface CookieConsent {
  /** Functional cookies (Calendly scheduling embed). */
  functional: boolean;
  /** ISO timestamp of the decision. */
  decidedAt: string;
  /** Schema version, lets us re-prompt if categories change. */
  version: number;
}

export type OptionalCookieCategory = 'functional';

const COOKIE_NAME = 'redtekk_cookie_consent';
const CONSENT_VERSION = 1;
/** One year, in seconds. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Stores the visitor's cookie choices and drives the banner/preferences UI.
 * The decision itself is kept in a first-party cookie. Only "functional" is
 * optional: it gates the Calendly embed, the single third party on the site
 * that sets cookies.
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly _document = inject(DOCUMENT);

  private readonly _consent = signal<CookieConsent | null>(this._read());
  public readonly consent = this._consent.asReadonly();

  public readonly preferencesOpen = signal(false);

  /** The banner shows until a choice has been stored. */
  public readonly bannerVisible = computed(() => this._consent() === null);

  public hasConsent(category: OptionalCookieCategory): boolean {
    return this._consent()?.[category] ?? false;
  }

  public acceptAll(): void {
    this._persist({ functional: true });
  }

  public declineAll(): void {
    this._persist({ functional: false });
  }

  public save(selection: { functional: boolean }): void {
    this._persist(selection);
    this.preferencesOpen.set(false);
  }

  public openPreferences(): void {
    this.preferencesOpen.set(true);
  }

  public closePreferences(): void {
    this.preferencesOpen.set(false);
  }

  private _persist(selection: { functional: boolean }): void {
    const consent: CookieConsent = {
      functional: selection.functional,
      decidedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    this._consent.set(consent);

    const value = encodeURIComponent(JSON.stringify(consent));
    this._document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }

  private _read(): CookieConsent | null {
    try {
      const match = this._document.cookie
        .split('; ')
        .find((entry) => entry.startsWith(`${COOKIE_NAME}=`));

      if (!match) {
        return null;
      }

      const parsed = JSON.parse(decodeURIComponent(match.slice(COOKIE_NAME.length + 1))) as CookieConsent;

      return parsed.version === CONSENT_VERSION ? parsed : null;
    } catch {
      return null;
    }
  }
}

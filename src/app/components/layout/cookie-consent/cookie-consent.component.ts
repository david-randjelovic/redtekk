import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CookieConsentService } from '../../../services/cookie-consent.service';

@Component({
  standalone: true,
  selector: 'app-cookie-consent',
  imports: [RouterLink],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent {
  protected readonly cookies = inject(CookieConsentService);

  /** Draft toggle state while the preferences modal is open. */
  protected readonly draftFunctional = signal(false);

  constructor() {
    // Sync the draft from stored consent each time the modal opens.
    effect(() => {
      if (this.cookies.preferencesOpen()) {
        this.draftFunctional.set(this.cookies.hasConsent('functional'));
      }
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.cookies.preferencesOpen()) {
      this.cookies.closePreferences();
    }
  }

  protected toggleFunctional(): void {
    this.draftFunctional.update((value) => !value);
  }

  protected savePreferences(): void {
    this.cookies.save({ functional: this.draftFunctional() });
  }
}

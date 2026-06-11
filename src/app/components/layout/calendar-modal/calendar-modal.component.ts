import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { CalendarModalService } from '../../../services/calendar-modal.service';
import { CookieConsentService } from '../../../services/cookie-consent.service';

@Component({
  standalone: true,
  selector: 'app-calendar-modal',
  imports: [RouterLink],
  templateUrl: './calendar-modal.component.html',
  styleUrl: './calendar-modal.component.scss',
})
export class CalendarModalComponent {
  protected readonly calendar = inject(CalendarModalService);
  protected readonly cookies = inject(CookieConsentService);
  private readonly _sanitizer = inject(DomSanitizer);

  /** Becomes true once the Calendly iframe finishes loading. */
  protected readonly loaded = signal(false);

  /** Calendly scheduling URL, themed to match the dark UI. */
  protected readonly calendlyUrl: SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
    'https://calendly.com/randjelovic-david01/30min?hide_gdpr_banner=1&background_color=0b0b10&text_color=d6d6dc&primary_color=e23b4e',
  );

  constructor() {
    // The iframe is recreated each time the modal opens, so reset the
    // loading state to show the placeholder again.
    effect(() => {
      if (this.calendar.isOpen()) {
        this.loaded.set(false);
      }
    });
  }

  protected onFrameLoad(): void {
    this.loaded.set(true);
  }

  /** Grant functional consent so Calendly can load, triggered from the modal prompt. */
  protected allowAndLoad(): void {
    this.cookies.save({ functional: true });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.calendar.isOpen()) {
      this.calendar.close();
    }
  }
}

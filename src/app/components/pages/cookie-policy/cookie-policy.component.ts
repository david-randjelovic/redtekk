import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CookieConsentService } from '../../../services/cookie-consent.service';
import { SeoService } from '../../../services/seo.service';

@Component({
  standalone: true,
  selector: 'app-cookie-policy',
  imports: [RouterLink],
  templateUrl: './cookie-policy.component.html',
})
export class CookiePolicyComponent {
  protected readonly cookies = inject(CookieConsentService);

  constructor() {
    inject(SeoService).apply({
      title: 'Cookie Policy | Redtekk',
      description: 'Which cookies this site uses, why, and how to manage them.',
      path: '/cookie-policy',
    });
  }
}

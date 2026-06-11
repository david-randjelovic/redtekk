import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CookieConsentService } from '../../../services/cookie-consent.service';

@Component({
  standalone: true,
  selector: 'app-cookie-policy',
  imports: [RouterLink],
  templateUrl: './cookie-policy.component.html',
})
export class CookiePolicyComponent {
  protected readonly cookies = inject(CookieConsentService);
}

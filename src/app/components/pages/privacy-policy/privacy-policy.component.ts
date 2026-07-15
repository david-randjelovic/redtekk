import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../services/seo.service';

@Component({
  standalone: true,
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Privacy Policy | Redtekk',
      description: 'How Redtekk collects, uses, and protects your personal data.',
      path: '/privacy-policy',
    });
  }
}

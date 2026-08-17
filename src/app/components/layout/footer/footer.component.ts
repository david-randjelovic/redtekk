import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterColumn, FooterSocialLink } from '../../../interfaces/navigation.interfaces';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { CookieConsentService } from '../../../services/cookie-consent.service';
import { BrandComponent } from '../brand/brand.component';

@Component({
  standalone: true,
  selector: 'app-site-footer',
  imports: [BrandComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly calendar = inject(CalendarModalService);
  protected readonly cookies = inject(CookieConsentService);

  protected readonly footerColumns: ReadonlyArray<FooterColumn> = [
    {
      title: 'Services',
      links: [
        { label: 'Design', serviceId: 'design' },
        { label: 'Development', serviceId: 'development' },
        { label: 'AI Solutions', serviceId: 'ai' },
        { label: 'Integrations', serviceId: 'integrations' },
        { label: 'Optimization', serviceId: 'optimization' },
        { label: 'Support', serviceId: 'support' },
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Process', route: '/process' },
        { label: 'Work', route: '/work' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Get in touch', route: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', route: '/privacy-policy' },
        { label: 'Cookie Policy', route: '/cookie-policy' },
        { label: 'Cookie settings', action: 'cookies' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'hello@redtekk.com', href: 'mailto:hello@redtekk.com' },
        { label: 'RS · Serbia', href: '#' },
      ],
    },
  ];

  protected readonly socials: ReadonlyArray<FooterSocialLink> = [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'X', href: '#', icon: 'twitter' },
  ];
}

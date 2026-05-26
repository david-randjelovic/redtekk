import { Component } from '@angular/core';

import { FooterColumn, FooterSocialLink } from '../../../interfaces/navigation.interfaces';
import { BrandComponent } from '../brand/brand.component';

@Component({
  standalone: true,
  selector: 'app-site-footer',
  imports: [BrandComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly footerColumns: ReadonlyArray<FooterColumn> = [
    {
      title: 'Services',
      links: [
        { label: 'Web Design', href: '#services' },
        { label: 'Development', href: '#services' },
        { label: 'Web Apps', href: '#services' },
        { label: 'Maintenance', href: '#services' },
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'Why us', href: '#why' },
        { label: 'Process', href: '#process' },
        { label: 'Case studies', href: '#work' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Journal', href: '#' },
        { label: 'Playbooks', href: '#' },
        { label: 'Brand assets', href: '#' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'hello@redtekk.com', href: 'mailto:hello@redtekk.com' },
        { label: '+1 (415) 555 0188', href: 'tel:+14155550188' },
        { label: 'San Francisco · Lisbon', href: '#' },
      ],
    },
  ];

  protected readonly socials: ReadonlyArray<FooterSocialLink> = [
    { label: 'Twitter', href: '#', icon: 'twitter' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Dribbble', href: '#', icon: 'dribbble' },
    { label: 'GitHub', href: '#', icon: 'github' },
  ];
}

import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ServiceSummary } from '../interfaces/services.interfaces';

/**
 * Holds the service catalogue rendered by the services section and linked
 * from the footer. Each entry links to its own detail page at /services/:id.
 */
@Injectable({ providedIn: 'root' })
export class ServicesCatalogService {
  private readonly _sanitizer = inject(DomSanitizer);

  public readonly services: ServiceSummary[] = [
    {
      id: 'design',
      num: '01',
      label: 'Identity',
      title: 'Design',
      short: 'Creating brands, websites, and digital experiences that build trust and leave a lasting impression.',
      icon: this._icon(
        '<rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /><path d="M7 14h4" />',
      ),
    },
    {
      id: 'development',
      num: '02',
      label: 'Build',
      title: 'Development',
      short: 'Building websites, web applications, and mobile applications that are fast, scalable, and built to last.',
      icon: this._icon('<path d="M8 6l-5 6 5 6" /><path d="M16 6l5 6-5 6" />'),
    },
    {
      id: 'ai',
      num: '03',
      label: 'Innovate',
      title: 'AI Solutions',
      short: 'Integrating intelligent features that automate workflows, enhance user experiences, and create new opportunities for growth.',
      icon: this._icon(
        '<path d="M12 3l1.7 4.9L18.5 9.6l-4.8 1.7L12 16l-1.7-4.7L5.5 9.6l4.8-1.7z" /><path d="M18.5 14l.8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8z" />',
      ),
    },
    {
      id: 'integrations',
      num: '04',
      label: 'Connect',
      title: 'Integrations',
      short: 'Connecting your digital products with the tools, platforms, and services your business depends on.',
      icon: this._icon(
        '<circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.6-2.8l2-1.6-2-3.4-2.4.9A7 7 0 0 0 13 3.3l-.4-2.6h-1.2L11 3.3a7 7 0 0 0-3 1.8l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .6 2.8l-2 1.6 2 3.4 2.4-.9a7 7 0 0 0 3 1.8l.4 2.6h1.2l.4-2.6a7 7 0 0 0 3-1.8l2.4.9 2-3.4-2-1.6A7 7 0 0 0 19 12z" />',
      ),
    },
    {
      id: 'optimization',
      num: '05',
      label: 'Grow',
      title: 'Optimization',
      short: 'Improving performance, SEO, accessibility, and conversions through continuous refinement.',
      icon: this._icon('<path d="M4 18l4-4 4 4 8-8" /><path d="M14 6h6v6" />'),
    },
    {
      id: 'support',
      num: '06',
      label: 'Stay',
      title: 'Support',
      short: 'Providing ongoing maintenance, improvements, and technical guidance long after launch.',
      icon: this._icon(
        '<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.6" /><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />',
      ),
    },
  ];

  /** Wraps the icon's inner paths in a stroked <svg> and marks it trusted. */
  private _icon(paths: string): ReturnType<DomSanitizer['bypassSecurityTrustHtml']> {
    const svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

    return this._sanitizer.bypassSecurityTrustHtml(svg);
  }
}

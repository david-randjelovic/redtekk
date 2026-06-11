import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ServiceDetail } from '../interfaces/services.interfaces';

/**
 * Holds the service catalogue and the currently opened service detail.
 * Shared so any component (services section, footer) can open the same
 * detail modal that the services section renders.
 */
@Injectable({ providedIn: 'root' })
export class ServicesModalService {
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _document = inject(DOCUMENT);

  public readonly active = signal<ServiceDetail | null>(null);

  public readonly services: ServiceDetail[] = [
    {
      id: 'design',
      num: '01',
      label: 'Identity',
      title: 'Design',
      short: 'Creating brands, websites, and digital experiences that build trust and leave a lasting impression.',
      intro:
        'Design is where trust begins. We craft brands, websites, and product interfaces that feel considered in every detail, clear, confident, and unmistakably yours. From the first wireframe to the final pixel, every decision is made to leave a lasting impression.',
      includes: [
        'Brand identity & visual systems',
        'Website & landing page design',
        'Product & app UI/UX design',
        'Design systems & component libraries',
        'Prototyping & interaction design',
      ],
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
      intro:
        "We turn designs into fast, reliable products. Whether it's a marketing site, a complex web application, or a mobile app, we write clean, maintainable code built to scale with your business, not slow it down.",
      includes: [
        'Websites & landing pages',
        'Web applications & dashboards',
        'Mobile applications',
        'API design & backend development',
        'Performance-first, scalable architecture',
      ],
      icon: this._icon('<path d="M8 6l-5 6 5 6" /><path d="M16 6l5 6-5 6" />'),
    },
    {
      id: 'ai',
      num: '03',
      label: 'Innovate',
      title: 'AI Solutions',
      short: 'Integrating intelligent features that automate workflows, enhance user experiences, and create new opportunities for growth.',
      intro:
        'Bring intelligence into your product. We integrate AI where it actually moves the needle, automating repetitive work, surfacing insight, and creating experiences that feel effortless for your users and your team.',
      includes: [
        'AI feature integration (chat, search, automation)',
        'Workflow & process automation',
        'LLM-powered assistants & agents',
        'Data enrichment & smart recommendations',
        'Custom model integration & tooling',
      ],
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
      intro:
        'Your stack should work as one. We connect the tools, platforms, and services your business depends on, payments, CRMs, email, analytics, and more, so data flows automatically and nothing falls through the cracks.',
      includes: [
        'Payment & billing (Stripe and more)',
        'CRM, email & marketing platforms',
        'Third-party APIs & webhooks',
        'Internal tools & data syncing',
        'Automation between services',
      ],
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
      intro:
        'Launch is the starting line, not the finish. We continuously refine performance, SEO, accessibility, and conversions, small, measured improvements that compound into real growth over time.',
      includes: [
        'Performance & Core Web Vitals',
        'SEO & technical audits',
        'Accessibility (WCAG) improvements',
        'Conversion rate optimization',
        'Analytics & ongoing experimentation',
      ],
      icon: this._icon('<path d="M4 18l4-4 4 4 8-8" /><path d="M14 6h6v6" />'),
    },
    {
      id: 'support',
      num: '06',
      label: 'Stay',
      title: 'Support',
      short: 'Providing ongoing maintenance, improvements, and technical guidance long after launch.',
      intro:
        "We don't disappear after launch. You get a dedicated team that maintains, improves, and guides your product for years, same people, same standards, always a message away.",
      includes: [
        'Proactive maintenance & monitoring',
        'Bug fixes & security updates',
        'Feature improvements & iterations',
        'Technical guidance & consulting',
        'Same team, same Slack, for years',
      ],
      icon: this._icon(
        '<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.6" /><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />',
      ),
    },
  ];

  public openById(id: string): void {
    const service = this.services.find((entry) => entry.id === id);

    if (service) {
      this.open(service);
    }
  }

  public open(service: ServiceDetail): void {
    this.active.set(service);
    this._setScrollLock(true);
  }

  public close(): void {
    this.active.set(null);
    this._setScrollLock(false);
  }

  private _setScrollLock(locked: boolean): void {
    this._document.body.style.overflow = locked ? 'hidden' : '';
  }

  /** Wraps the icon's inner paths in a stroked <svg> and marks it trusted. */
  private _icon(paths: string): ReturnType<DomSanitizer['bypassSecurityTrustHtml']> {
    const svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

    return this._sanitizer.bypassSecurityTrustHtml(svg);
  }
}

import { Component, inject } from '@angular/core';

import { FAQ_SCHEMA } from '../../../data/faq';
import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { SeoService } from '../../../services/seo.service';
import { CaseStudiesSectionComponent } from '../../sections/case-studies-section/case-studies-section.component';
import { FaqSectionComponent } from '../../sections/faq-section/faq-section.component';
import { FinalCtaSectionComponent } from '../../sections/final-cta-section/final-cta-section.component';
import { HeroSectionComponent } from '../../sections/hero-section/hero-section.component';
import { ProcessSectionComponent } from '../../sections/process-section/process-section.component';
import { ServicesSectionComponent } from '../../sections/services-section/services-section.component';
import { TestimonialsSectionComponent } from '../../sections/testimonials-section/testimonials-section.component';
import { TrustSectionComponent } from '../../sections/trust-section/trust-section.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CaseStudiesSectionComponent,
    FaqSectionComponent,
    FinalCtaSectionComponent,
    HeroSectionComponent,
    ProcessSectionComponent,
    RedtekkMotionDirective,
    ServicesSectionComponent,
    TestimonialsSectionComponent,
    TrustSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Custom Software Development Studio | Redtekk',
      description:
        'We design, build, and support custom software, web apps, and AI features that businesses rely on long after launch. A small senior studio from Novi Sad.',
      path: '/',
      jsonLd: FAQ_SCHEMA,
    });
  }
}

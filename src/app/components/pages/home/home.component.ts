import { Component } from '@angular/core';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CaseStudiesSectionComponent } from '../../sections/case-studies-section/case-studies-section.component';
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
export class HomeComponent {}

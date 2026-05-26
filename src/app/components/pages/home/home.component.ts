import { Component } from '@angular/core';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CaseStudiesSectionComponent } from '../../sections/case-studies-section/case-studies-section.component';
import { FinalCtaSectionComponent } from '../../sections/final-cta-section/final-cta-section.component';
import { HeroSectionComponent } from '../../sections/hero-section/hero-section.component';
import { ProcessSectionComponent } from '../../sections/process-section/process-section.component';
import { ServicesSectionComponent } from '../../sections/services-section/services-section.component';
import { StatsSectionComponent } from '../../sections/stats-section/stats-section.component';
import { TestimonialsSectionComponent } from '../../sections/testimonials-section/testimonials-section.component';
import { TrustSectionComponent } from '../../sections/trust-section/trust-section.component';
import { VersusSectionComponent } from '../../sections/versus-section/versus-section.component';
import { WhySectionComponent } from '../../sections/why-section/why-section.component';

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
    StatsSectionComponent,
    TestimonialsSectionComponent,
    TrustSectionComponent,
    VersusSectionComponent,
    WhySectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

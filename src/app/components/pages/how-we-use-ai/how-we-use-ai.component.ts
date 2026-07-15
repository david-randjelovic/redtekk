import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { AiPageCard, AiPageStep } from '../../../interfaces/ai-page.interfaces';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-how-we-use-ai',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './how-we-use-ai.component.html',
})
export class HowWeUseAiComponent implements OnInit {
  private readonly _seo = inject(SeoService);

  protected readonly calendar = inject(CalendarModalService);

  protected readonly businessCards: ReadonlyArray<AiPageCard> = [
    {
      eyebrow: 'Find the fit',
      title: 'We start with the real workflow.',
      text: 'We look at where your team spends time, repeats work, waits for information, or makes decisions with incomplete data.',
    },
    {
      eyebrow: 'Build the layer',
      title: 'We connect AI to the tools you already use.',
      text: 'That can mean internal assistants, document search, smart forms, CRM helpers, reporting flows, or automations between systems.',
    },
    {
      eyebrow: 'Keep control',
      title: 'AI supports the team. It does not replace judgment.',
      text: 'We design clear guardrails, review steps, permissions, and human approval where the business risk is higher.',
    },
    {
      eyebrow: 'Measure value',
      title: 'We ship what can be checked.',
      text: 'The goal is practical: less manual work, faster answers, better decisions, and a system your team can actually use.',
    },
  ];

  protected readonly deliverySteps: ReadonlyArray<AiPageStep> = [
    {
      title: 'Faster planning',
      text: 'AI helps us explore edge cases, turn rough ideas into clear tickets, and compare implementation paths faster.',
    },
    {
      title: 'Faster prototyping',
      text: 'We can validate screens, flows, integrations, and technical approaches earlier, before the budget is spent on the wrong direction.',
    },
    {
      title: 'Faster implementation',
      text: 'Agentic coding tools help with scaffolding, repetitive code, migrations, tests, and documentation.',
    },
    {
      title: 'Senior review stays mandatory',
      text: 'Developers still own architecture, security, performance, code review, and final decisions. AI does not merge code by itself.',
    },
    {
      title: 'Better delivery loop',
      text: 'More time goes into product thinking, QA, maintainability, and the small details that make software easier to live with.',
    },
  ];

  protected readonly trustCards: ReadonlyArray<AiPageCard> = [
    {
      eyebrow: 'Quality',
      title: 'AI output is reviewed like any other code.',
      text: 'We check correctness, structure, tests, maintainability, and whether the solution fits the product.',
    },
    {
      eyebrow: 'Security',
      title: 'Sensitive data needs rules.',
      text: 'We avoid careless data sharing and design AI features around access control, logging, and safe defaults.',
    },
    {
      eyebrow: 'Ownership',
      title: 'The team remains accountable.',
      text: 'AI speeds up parts of the work, but RedTekk engineers are responsible for what gets shipped.',
    },
  ];

  public ngOnInit(): void {
    this._seo.apply({
      title: 'How We Use AI | Redtekk',
      description:
        'Where AI actually helps a business and where it does not. How we find the right use cases and ship practical AI features that save real time.',
      path: '/how-we-use-ai',
    });
  }
}

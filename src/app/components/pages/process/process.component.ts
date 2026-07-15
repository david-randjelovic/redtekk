import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { ProcessPageCard, ProcessStage } from '../../../interfaces/process-page.interfaces';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-process',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './process.component.html',
})
export class ProcessComponent implements OnInit {
  private readonly _seo = inject(SeoService);

  protected readonly calendar = inject(CalendarModalService);

  protected readonly stages: ReadonlyArray<ProcessStage> = [
    {
      num: '01',
      title: 'Discovery',
      summary: 'We learn how your business actually works.',
      text: 'Before any solution gets proposed, we learn how your business works: the people involved, the constraints you operate under, and the outcome that matters most. We review what you already have, an existing product, data, prior attempts, so the plan that follows is grounded in reality, not assumptions.',
      deliverable: 'A clear problem statement and project scope.',
    },
    {
      num: '02',
      title: 'Strategy',
      summary: 'Clear priorities. Clear direction.',
      text: 'With the problem understood, we turn it into a plan: what gets built first, what can wait, and what the realistic timeline and budget look like. We prioritize by impact, not by what is easiest to build, so early effort goes toward what actually moves the business forward.',
      deliverable: 'A prioritized roadmap and technical approach.',
    },
    {
      num: '03',
      title: 'Design',
      summary: 'Interfaces people understand instantly.',
      text: 'We design the screens and flows your users will actually touch, and test them against real use cases before a single line of production code is written. Every interface decision is checked against clarity and ease of use, not just visual style.',
      deliverable: 'Reviewed prototypes ready for development.',
    },
    {
      num: '04',
      title: 'Development',
      summary: 'Built with performance, reliability, and scalability in mind.',
      text: 'Designs become working software, built on an architecture chosen for your actual scale and team size. Senior engineers review every change, so quality does not depend on who happened to write a given feature.',
      deliverable: 'Tested, production-ready features.',
    },
    {
      num: '05',
      title: 'Launch',
      summary: 'A smooth release with zero surprises.',
      text: 'Launch is planned, not improvised. We test the release process itself ahead of time, prepare a rollback plan, and monitor closely in the hours after going live, so the moment your users arrive, things work.',
      deliverable: 'A live product and a documented release.',
    },
    {
      num: '06',
      title: 'Support',
      summary: 'Continuous improvements from the same team that built it.',
      text: 'Launch is not the end of the relationship. The same team that built your product keeps maintaining, improving, and advising on it, so it keeps working and keeps getting better as your business changes.',
      deliverable: 'Ongoing maintenance and a direct line to the team.',
    },
  ];

  protected readonly principles: ReadonlyArray<ProcessPageCard> = [
    {
      eyebrow: 'Transparency',
      title: 'You see progress, not just promises.',
      text: 'Every stage ends with something concrete you can review: a plan, a prototype, a feature, a release.',
    },
    {
      eyebrow: 'Senior ownership',
      title: 'The people who scope it, build it.',
      text: 'No handoff between a sales team and a delivery team. The engineers who plan your project are the ones who ship it.',
    },
    {
      eyebrow: 'Built to adapt',
      title: 'Plans change. The process allows for it.',
      text: 'Priorities shift as you learn more. We adjust the roadmap without losing the structure that keeps the project on track.',
    },
  ];

  public ngOnInit(): void {
    this._seo.apply({
      title: 'Our Process | Redtekk',
      description:
        'How we take a product from the first conversation to launch and beyond: scoping, design, build, review, and long-term support, step by step.',
      path: '/process',
    });
  }
}

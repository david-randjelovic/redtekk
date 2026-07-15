import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { AboutPageCard, AboutPagePrinciple } from '../../../interfaces/about-page.interfaces';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  private readonly _seo = inject(SeoService);

  protected readonly calendar = inject(CalendarModalService);

  protected readonly cards: ReadonlyArray<AboutPageCard> = [
    {
      eyebrow: 'Small team',
      title: 'You work directly with the people building the product.',
      text: 'No layers of account managers. No handoff maze. You get engineers and designers who understand the work and stay close to the details.',
    },
    {
      eyebrow: 'Real ownership',
      title: 'We treat every project like it has to live after launch.',
      text: 'The goal is not just to ship screens. The goal is to build something stable, useful, and easy to improve when your business changes.',
    },
    {
      eyebrow: 'Clear process',
      title: 'We keep the work simple to follow.',
      text: 'You know what we are building, why it matters, what is next, and where your budget is going.',
    },
  ];

  protected readonly principles: ReadonlyArray<AboutPagePrinciple> = [
    {
      title: 'Understand before building',
      text: 'We first learn how your business works, what users need, and where the product has to create value.',
    },
    {
      title: 'Design for real people',
      text: 'Good software should feel obvious. We care about clear flows, useful details, and interfaces people can trust.',
    },
    {
      title: 'Build with senior judgment',
      text: 'Every technical choice has a tradeoff. We choose tools and architecture that fit the product, not the trend of the week.',
    },
    {
      title: 'Stay after launch',
      text: 'Launch is not the end. We support, improve, and help the product grow with your team.',
    },
  ];

  public ngOnInit(): void {
    this._seo.apply({
      title: 'About Us | Redtekk',
      description:
        'Redtekk is a small software studio from Novi Sad, Serbia, founded by engineer David Ranđelović. Meet the people behind it and see how we work.',
      path: '/about',
    });
  }
}

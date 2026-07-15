import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly _seo = inject(SeoService);

  protected readonly calendar = inject(CalendarModalService);

  public ngOnInit(): void {
    this._seo.apply({
      title: 'Contact Us | Redtekk',
      description:
        'Tell us what you are building. Email hello@redtekk.com or schedule a meeting to talk it through with the people who would build it.',
      path: '/contact',
    });
  }
}

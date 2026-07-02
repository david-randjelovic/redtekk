import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  private readonly _title = inject(Title);

  protected readonly calendar = inject(CalendarModalService);

  public ngOnInit(): void {
    this._title.setTitle('Contact Us | RedTekk');
  }
}

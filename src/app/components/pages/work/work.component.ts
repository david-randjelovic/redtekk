import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { WORK_PROJECTS } from '../../../data/work-projects';
import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-work',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './work.component.html',
})
export class WorkComponent implements OnInit {
  private readonly _title = inject(Title);

  protected readonly calendar = inject(CalendarModalService);
  protected readonly projects = WORK_PROJECTS;

  public ngOnInit(): void {
    this._title.setTitle('Our Work | RedTekk');
  }
}

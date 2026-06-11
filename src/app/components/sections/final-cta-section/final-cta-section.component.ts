import { Component, inject } from '@angular/core';

import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-final-cta-section',
  imports: [ButtonComponent],
  templateUrl: './final-cta-section.component.html',
  styleUrl: './final-cta-section.component.scss',
})
export class FinalCtaSectionComponent {
  protected readonly calendar = inject(CalendarModalService);
}

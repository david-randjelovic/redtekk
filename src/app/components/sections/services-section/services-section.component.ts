import { Component, HostListener, inject } from '@angular/core';

import { ServicesModalService } from '../../../services/services-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-services-section',
  imports: [ButtonComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
})
export class ServicesSectionComponent {
  protected readonly modal = inject(ServicesModalService);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.modal.active()) {
      this.modal.close();
    }
  }
}

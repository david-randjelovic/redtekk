import { Component } from '@angular/core';

import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-final-cta-section',
  imports: [ButtonComponent],
  templateUrl: './final-cta-section.component.html',
  styleUrl: './final-cta-section.component.scss',
})
export class FinalCtaSectionComponent {}

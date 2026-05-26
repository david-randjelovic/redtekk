import { Component } from '@angular/core';

import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {}

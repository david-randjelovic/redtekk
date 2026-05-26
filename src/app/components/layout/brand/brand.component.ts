import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-brand',
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
})
export class BrandComponent {
  public readonly href = input('#');
  public readonly ariaLabel = input('RedTekk home');
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-trust-section',
  imports: [RouterLink],
  templateUrl: './trust-section.component.html',
  styleUrl: './trust-section.component.scss',
})
export class TrustSectionComponent {}

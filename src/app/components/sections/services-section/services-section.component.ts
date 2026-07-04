import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ServicesCatalogService } from '../../../services/services-catalog.service';

@Component({
  standalone: true,
  selector: 'app-services-section',
  imports: [RouterLink],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
})
export class ServicesSectionComponent {
  protected readonly catalog = inject(ServicesCatalogService);
}

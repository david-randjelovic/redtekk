import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-process-section',
  imports: [RouterLink],
  templateUrl: './process-section.component.html',
  styleUrl: './process-section.component.scss',
})
export class ProcessSectionComponent {}

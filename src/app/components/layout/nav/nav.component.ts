import { Component, input } from '@angular/core';

import { NavLink } from '../../../interfaces/navigation.interfaces';

@Component({
  standalone: true,
  selector: 'app-site-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public readonly links = input.required<ReadonlyArray<NavLink>>();
}

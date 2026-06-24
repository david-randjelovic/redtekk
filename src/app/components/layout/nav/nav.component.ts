import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavLink } from '../../../interfaces/navigation.interfaces';

@Component({
  standalone: true,
  selector: 'app-site-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public readonly links = input.required<ReadonlyArray<NavLink>>();

  protected openDropdownLabel: string | null = null;

  protected openDropdown(link: NavLink): void {
    if (!link.children?.length) {
      return;
    }

    this.openDropdownLabel = link.label;
  }

  protected toggleDropdown(link: NavLink): void {
    if (!link.children?.length) {
      this.closeDropdown();
      return;
    }

    this.openDropdownLabel = this.isDropdownOpen(link) ? null : link.label;
  }

  protected closeDropdown(): void {
    this.openDropdownLabel = null;
  }

  protected isDropdownOpen(link: NavLink): boolean {
    return this.openDropdownLabel === link.label;
  }
}

import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavLink } from '../../../interfaces/navigation.interfaces';
import { ButtonComponent } from '../../ui/button/button.component';

const MOBILE_BREAKPOINT = 991;

@Component({
  standalone: true,
  selector: 'app-site-nav',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public readonly links = input.required<ReadonlyArray<NavLink>>();

  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _document = inject(DOCUMENT);

  protected openDropdownLabel: string | null = null;
  protected readonly isMobileOpen = signal(false);

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

  protected toggleMobileMenu(): void {
    this.isMobileOpen.update((open) => !open);
    this._setScrollLock(this.isMobileOpen());

    if (!this.isMobileOpen()) {
      this.closeDropdown();
    }
  }

  protected closeMobileMenu(): void {
    this.isMobileOpen.set(false);
    this._setScrollLock(false);
    this.closeDropdown();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMobileMenu();
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isMobileOpen()) {
      return;
    }

    if (!this._elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMobileMenu();
    }
  }

  private _setScrollLock(locked: boolean): void {
    const overflow = locked ? 'hidden' : '';

    // Lock the root element too: on mobile browsers the document scrolls on
    // <html>, so hiding overflow only on <body> still lets the page move
    // behind the open menu.
    this._document.documentElement.style.overflow = overflow;
    this._document.body.style.overflow = overflow;
  }
}

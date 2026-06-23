import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/**
 * Controls the global "Schedule a meeting" Calendly popup. Shared so any
 * "Schedule a meeting" trigger (header, hero, final CTA, footer) opens the
 * single modal rendered at the app root.
 */
@Injectable({ providedIn: 'root' })
export class CalendarModalService {
  private readonly _document = inject(DOCUMENT);

  public readonly isOpen = signal(false);

  public open(): void {
    this.isOpen.set(true);
    this._setScrollLock(true);
  }

  public close(): void {
    this.isOpen.set(false);
    this._setScrollLock(false);
  }

  private _setScrollLock(locked: boolean): void {
    this._document.body.style.overflow = locked ? 'hidden' : '';
  }
}

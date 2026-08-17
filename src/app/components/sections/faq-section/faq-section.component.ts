import { Component, signal } from '@angular/core';

import { FAQ_ITEMS } from '../../../data/faq';

@Component({
  standalone: true,
  selector: 'app-faq-section',
  imports: [],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
})
export class FaqSectionComponent {
  protected readonly items = FAQ_ITEMS;

  /** Indexes of expanded items; the first one starts open. */
  private readonly _openItems = signal<ReadonlySet<number>>(new Set([0]));

  protected isOpen(index: number): boolean {
    return this._openItems().has(index);
  }

  protected toggle(index: number): void {
    this._openItems.update((open) => {
      const next = new Set(open);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }
}

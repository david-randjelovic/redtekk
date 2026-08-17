import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonSize, ButtonType, ButtonVariant } from '../../../interfaces/ui.interfaces';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public readonly variant = input<ButtonVariant>('primary');
  public readonly size = input<ButtonSize>('default');
  public readonly label = input('');
  /** In-app route; rendered as a router link. Takes precedence over href. */
  public readonly route = input<string | null>(null);
  public readonly href = input<string | null>(null);
  public readonly target = input<string | null>(null);
  public readonly rel = input<string | null>(null);
  public readonly type = input<ButtonType>('button');
  public readonly disabled = input(false);
  public readonly ariaLabel = input<string | null>(null);
  public readonly showArrow = input(true);

  protected readonly classes = computed(() => {
    const sizeClass = this.size() === 'sm' ? ' btn-sm' : '';

    return `btn btn-${this.variant()}${sizeClass}`;
  });

  protected readonly resolvedRel = computed(() => {
    if (this.rel()) {
      return this.rel();
    }

    return this.target() === '_blank' ? 'noopener noreferrer' : null;
  });

  protected readonly resolvedAriaLabel = computed(() => {
    const label = this.label().trim();

    return this.ariaLabel() ?? (label.length > 0 ? label : null);
  });
}

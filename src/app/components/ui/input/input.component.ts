import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputType } from '../../../interfaces/ui.interfaces';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private static _nextId = 0;

  public readonly inputId = input(`redtekk-input-${InputComponent._nextId++}`);
  public readonly label = input('');
  public readonly name = input('');
  public readonly placeholder = input('');
  public readonly type = input<InputType>('text');
  public readonly autocomplete = input<string | null>(null);
  public readonly required = input(false);
  public readonly disabled = input(false);

  protected value = '';
  protected isDisabled = false;

  private _onChange: (value: string) => void = () => undefined;
  private _onTouched: () => void = () => undefined;

  public writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.value = target.value;
    this._onChange(this.value);
  }

  protected onBlur(): void {
    this._onTouched();
  }
}

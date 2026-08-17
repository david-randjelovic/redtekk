import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ContactApiService } from '../../../services/contact-api.service';
import { SeoService } from '../../../services/seo.service';
import { ButtonComponent } from '../../ui/button/button.component';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/** Submissions faster than this are treated as bots (a human cannot fill the form this quickly). */
const MIN_FILL_MS = 2500;

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ButtonComponent, ReactiveFormsModule, RedtekkMotionDirective, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly _seo = inject(SeoService);
  private readonly _api = inject(ContactApiService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _platformId = inject(PLATFORM_ID);

  protected readonly calendar = inject(CalendarModalService);

  protected readonly status = signal<FormStatus>('idle');
  protected readonly errorMessage = signal('');

  /** Human check: a small addition question shown to the visitor. */
  protected readonly captchaQuestion = signal('');
  private _captchaAnswer = 0;
  /** When the form was first rendered in the browser, for the timing trap. */
  private _formLoadedAt = 0;

  protected readonly form = this._formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    projectType: [''],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    captcha: ['', [Validators.required, this._captchaValidator()]],
    /** Honeypot: hidden from real visitors, bots fill it. */
    company: [''],
  });

  public ngOnInit(): void {
    // Generate the challenge only in the browser: it is random, so rendering it
    // during prerender would clash with the client render on hydration.
    if (isPlatformBrowser(this._platformId)) {
      this._newCaptcha();
      this._formLoadedAt = Date.now();
    }

    this._seo.apply({
      title: 'Contact Us | Redtekk',
      description:
        'Send us a message, email hello@redtekk.com, or schedule a meeting. Tell us what you are building and talk it through with the people who would build it.',
      path: '/contact',
    });
  }

  protected showError(controlName: 'name' | 'email' | 'message' | 'captcha'): boolean {
    const control = this.form.controls[controlName];

    return control.invalid && (control.touched || control.dirty);
  }

  protected async submit(): Promise<void> {
    if (this.status() === 'sending') {
      return;
    }

    // Honeypot tripped: silently drop it and show success so the bot moves on.
    if (this.form.getRawValue().company) {
      this.status.set('success');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Timing trap: a real person cannot fill this out in a couple of seconds.
    if (Date.now() - this._formLoadedAt < MIN_FILL_MS) {
      this.status.set('error');
      this.errorMessage.set('That went through a little too fast, please try again.');
      this._newCaptcha();
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    try {
      await this._api.send(this.form.getRawValue());
      this.status.set('success');
    } catch (error) {
      this.status.set('error');
      this.errorMessage.set(
        error instanceof Error && error.message !== 'Request failed'
          ? error.message
          : 'Something went wrong while sending your message.',
      );
      this._newCaptcha();
    }
  }

  protected resetForm(): void {
    this.form.reset();
    this.status.set('idle');
    this.errorMessage.set('');
    this._newCaptcha();
    this._formLoadedAt = Date.now();
  }

  /** Picks two small numbers and stores their sum as the expected answer. */
  private _newCaptcha(): void {
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;

    this._captchaAnswer = a + b;
    this.captchaQuestion.set(`What is ${a} + ${b}?`);
    this.form?.controls.captcha.setValue('');
    this.form?.controls.captcha.updateValueAndValidity();
  }

  private _captchaValidator(): ValidatorFn {
    return (control) => {
      const value = Number(String(control.value ?? '').trim());

      return value === this._captchaAnswer ? null : { captcha: true };
    };
  }
}

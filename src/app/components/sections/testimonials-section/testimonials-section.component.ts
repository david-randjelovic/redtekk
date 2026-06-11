import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';

interface Testimonial {
  /** Written feedback. Omit for rating-only reviews. */
  quote?: string;
  /** Star rating (out of 5) shown when there is no written quote. */
  rating?: number;
  name: string;
  role: string;
  image: string;
  featured?: boolean;
}

const GAP = 18;

@Component({
  standalone: true,
  selector: 'app-testimonials-section',
  imports: [],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
})
export class TestimonialsSectionComponent implements OnInit, OnDestroy {
  private readonly _document = inject(DOCUMENT);

  private _autoTimer: number | null = null;
  /** Once the user takes control, autoplay never resumes. */
  private _autoStopped = false;

  protected readonly testimonials: Testimonial[] = [
    {
      quote: 'David delivers work of exceptional quality and always goes above and beyond expectations.',
      name: 'Steinar Mangersnes',
      role: 'Kind Group',
      image: 'assets/testimonials/steinar.webp',
      featured: true,
    },
    {
      quote: 'David delivered an outstanding website for our esports team, sleek, engaging, and efficient!',
      name: 'Aleksa Stankovic',
      role: 'DoubleAiM Esports',
      image: 'assets/testimonials/double_aim.webp',
    },
    {
      quote: "David was great to work with. I'm very happy with the outcome of the project. I would highly recommend!",
      name: 'Tracey',
      role: 'Founder, HerdSpace',
      image: 'assets/testimonials/herdspace-profile.webp',
    },
    {
      quote: 'David crafted an amazing website for our driving school, professional, user-friendly, and effective!',
      name: 'Milos Trajkovic',
      role: 'Driving School Prvenstvo',
      image: 'assets/testimonials/Milos_Trajkovic.webp',
    },
    {
      quote: 'David helped me fix all bugs on my website, communicated excellently and completed all requests.',
      name: 'Bruno Bilonic',
      role: 'Bilonic Videography',
      image: 'assets/testimonials/buyer4.webp',
    },
    {
      quote: 'David did an amazing job creating my website! Professional, responsive, and exactly what I envisioned.',
      name: 'Jasmina Djordjevic',
      role: 'Zvrk 2024',
      image: 'assets/testimonials/JDJ.png',
    },
    {
      quote: 'David is a highly skilled developer. Highly recommended for large long-term projects.',
      name: 'Abdulrahman Aboshamah',
      role: 'VoyCiv',
      image: 'assets/testimonials/miodrag.webp',
    },
    {
      quote: 'David did a great job refreshing our website and then helped out with the general upkeep of all related content and media. Very knowledgable, creative and dependable resource for any company, highly recommended.',
      name: 'Abe Mcintosh',
      role: 'Co-Founder, Chair & COO @ Tangle Software',
      image: 'assets/testimonials/abe_mcintosh.jpg',
    },
    {
      rating: 5,
      name: 'Jeremy Murray',
      role: 'Founder & CEO, Stack8s',
      image: 'assets/testimonials/JM.jpeg',
    },
  ];

  /** Index of the first visible card. */
  protected readonly index = signal(0);
  /** Cards shown at once, adapts to viewport width. */
  protected readonly perView = signal(this._computePerView());

  protected readonly maxIndex = computed(() =>
    Math.max(0, this.testimonials.length - this.perView()),
  );

  /** One step per reachable starting position. */
  protected readonly dots = computed(() => Array.from({ length: this.maxIndex() + 1 }));

  /** Width of a single card for the current per-view count. */
  protected readonly slideBasis = computed(() => {
    const perView = this.perView();

    return `calc((100% - ${(perView - 1) * GAP}px) / ${perView})`;
  });

  protected readonly trackTransform = computed(() => {
    const perView = this.perView();
    const step = `((100% - ${(perView - 1) * GAP}px) / ${perView} + ${GAP}px)`;

    return `translateX(calc(-${this.index()} * ${step}))`;
  });

  public ngOnInit(): void {
    this._startAuto();
  }

  public ngOnDestroy(): void {
    this._clearAuto();
  }

  protected previous(): void {
    this._stopAuto();
    this._step(-1);
  }

  protected next(): void {
    this._stopAuto();
    this._step(1);
  }

  protected goTo(target: number): void {
    this._stopAuto();
    this.index.set(Math.min(this.maxIndex(), Math.max(0, target)));
  }

  /** Advance by direction, wrapping around at both ends. */
  private _step(direction: 1 | -1): void {
    const count = this.maxIndex() + 1;
    this.index.update((value) => (value + direction + count) % count);
  }

  private _startAuto(): void {
    if (this._autoStopped) {
      return;
    }

    const view = this._document.defaultView;

    if (!view || view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this._clearAuto();
    this._autoTimer = view.setInterval(() => this._step(1), 2000);
  }

  /** Hand control to the user; stop autoplay for the rest of the session. */
  private _stopAuto(): void {
    this._autoStopped = true;
    this._clearAuto();
  }

  private _clearAuto(): void {
    if (this._autoTimer !== null) {
      this._document.defaultView?.clearInterval(this._autoTimer);
      this._autoTimer = null;
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.perView.set(this._computePerView());
    this.index.set(Math.min(this.index(), this.maxIndex()));
  }

  private _computePerView(): number {
    const width = this._document.defaultView?.innerWidth ?? 1280;

    if (width <= 640) {
      return 1;
    }

    if (width <= 980) {
      return 2;
    }

    return 3;
  }
}

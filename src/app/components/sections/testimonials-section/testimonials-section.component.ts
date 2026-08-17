import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, PLATFORM_ID, computed, inject, signal } from '@angular/core';

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
export class TestimonialsSectionComponent implements AfterViewInit, OnDestroy {
  private readonly _document = inject(DOCUMENT);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  private _autoTimer: number | null = null;
  /** Once the user takes control, autoplay never resumes. */
  private _autoStopped = false;
  private _visibilityObserver: IntersectionObserver | null = null;

  protected readonly testimonials: Testimonial[] = [
    {
      quote: 'David is extremely easy to work with, maintaining excellent communication throughout the project. He delivers work of exceptional quality and always go above and beyond expectations. Highly recommend to anyone looking for a reliable and skilled professional!',
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
      quote: 'David has been incredible to work with (again). His communication is fantastic, his quality of work is incredible and he really went above and beyond with suggestions to make the product better than I had originally briefed. I would highly recommend David to anyone.',
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
      quote: 'David is a highly skilled developer, very professional, mild, and easy to work with. Highly recommended for large long-term projects. Thank you so much!',
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

  public ngAfterViewInit(): void {
    // Only autoplay while the slider is on screen, so a visitor lands on the
    // first slides instead of finding it already advanced to slide 4-5.
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    const view = this._document.defaultView;

    if (!view || !('IntersectionObserver' in view)) {
      this._startAuto();
      return;
    }

    // The host is `display: contents` (no box of its own), so observe the real
    // inner section element instead, otherwise the observer never intersects.
    const target = this._host.nativeElement.firstElementChild ?? this._host.nativeElement;

    this._visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this._startAuto();
          } else {
            this._clearAuto();
          }
        }
      },
      // Height-independent trigger: fire once the section is meaningfully into
      // the viewport (a ratio threshold can never be met by a very tall section).
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    );

    this._visibilityObserver.observe(target);
  }

  public ngOnDestroy(): void {
    this._visibilityObserver?.disconnect();
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
    if (this._autoStopped || !isPlatformBrowser(this._platformId)) {
      return;
    }

    const view = this._document.defaultView;

    if (!view || view.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
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

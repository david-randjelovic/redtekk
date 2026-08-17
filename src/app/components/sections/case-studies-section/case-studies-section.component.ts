import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WORK_PROJECTS } from '../../../data/work-projects';

const GAP = 18;

@Component({
  standalone: true,
  selector: 'app-case-studies-section',
  imports: [RouterLink],
  templateUrl: './case-studies-section.component.html',
  styleUrl: './case-studies-section.component.scss',
})
export class CaseStudiesSectionComponent implements AfterViewInit, OnDestroy {
  private readonly _document = inject(DOCUMENT);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  private _autoTimer: number | null = null;
  private _autoStopped = false;
  private _visibilityObserver: IntersectionObserver | null = null;

  protected readonly projects = WORK_PROJECTS;

  protected readonly index = signal(0);
  protected readonly perView = signal(this._computePerView());

  protected readonly maxIndex = computed(() => Math.max(0, this.projects.length - this.perView()));
  protected readonly dots = computed(() => Array.from({ length: this.maxIndex() + 1 }));

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
    // Only autoplay while the slider is on screen, so a visitor who has not
    // scrolled here yet still lands on the first slides instead of slide 4-5.
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

  @HostListener('window:resize')
  protected onResize(): void {
    this.perView.set(this._computePerView());
    this.index.set(Math.min(this.index(), this.maxIndex()));
  }

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

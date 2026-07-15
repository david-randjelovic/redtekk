import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
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
export class CaseStudiesSectionComponent implements OnInit, OnDestroy {
  private readonly _document = inject(DOCUMENT);
  private readonly _platformId = inject(PLATFORM_ID);

  private _autoTimer: number | null = null;
  private _autoStopped = false;

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

import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';

interface WorkProject {
  name: string;
  category: string;
  description: string;
  /** Screenshot path. Omit for confidential (NDA) projects. */
  image?: string;
  nda?: boolean;
}

const GAP = 18;

@Component({
  standalone: true,
  selector: 'app-case-studies-section',
  imports: [],
  templateUrl: './case-studies-section.component.html',
  styleUrl: './case-studies-section.component.scss',
})
export class CaseStudiesSectionComponent implements OnInit, OnDestroy {
  private readonly _document = inject(DOCUMENT);

  private _autoTimer: number | null = null;
  private _autoStopped = false;

  protected readonly projects: WorkProject[] = [
    { name: 'HerdSpace', category: 'Marketplace', description: 'AI-powered horse marketplace', image: 'assets/work/herdspace.webp' },
    { name: 'Tangle', category: 'Manufacturing', description: 'AI-powered ERP for manufacturing', image: 'assets/work/tangle.webp' },
    { name: 'Solar Planning App', category: 'Renewable', description: 'Planning tool for solar installers', nda: true },
    { name: 'Befive', category: 'Esports', description: 'Esports organization website', image: 'assets/work/befive.webp' },
    { name: 'Peakflow', category: 'Marketing', description: 'Marketing agency website', image: 'assets/work/peakflow.webp' },
    { name: 'Wine B2B Shop', category: 'B2B Commerce', description: 'Wholesale platform for the wine trade', nda: true },
    { name: 'Xelpi', category: 'Web Studio', description: 'Web development company site', image: 'assets/work/xelpi.webp' },
    { name: 'MCPR', category: 'Music', description: 'Electronic music & PR site', image: 'assets/work/mcpr.webp' },
    { name: 'Inverter App', category: 'Energy', description: 'Inverter monitoring application', nda: true },
    { name: 'Prvenstvo', category: 'Education', description: 'Driving school website', image: 'assets/work/prvenstvo.webp' },
    { name: 'ZVRK', category: 'E-commerce', description: 'Kids clothing store', image: 'assets/work/zvrk.webp' },
    { name: 'Solar Panel App', category: 'Renewable', description: 'Solar panel management application', nda: true },
    { name: 'TIM', category: 'SaaS', description: 'Restaurant table management', image: 'assets/work/tim.webp' },
    { name: 'Wine B2C Shop', category: 'E-commerce', description: 'Direct-to-consumer wine store', nda: true },
  ];

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

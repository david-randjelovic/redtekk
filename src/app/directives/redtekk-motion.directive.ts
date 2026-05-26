import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { ParticlePoint, PointerState } from '../interfaces/motion.interfaces';

@Directive({
  standalone: true,
  selector: '[appRedtekkMotion]',
})
export class RedtekkMotionDirective implements AfterViewInit, OnDestroy {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _ngZone = inject(NgZone);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _cleanupHandlers: Array<() => void> = [];
  private readonly _intersectionObservers: IntersectionObserver[] = [];

  private _heroFrameId: number | null = null;

  public ngAfterViewInit(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    this._ngZone.runOutsideAngular(() => {
      window.requestAnimationFrame(() => this._initMotion());
    });
  }

  public ngOnDestroy(): void {
    this._intersectionObservers.forEach((observer) => observer.disconnect());
    this._cleanupHandlers.forEach((handler) => handler());

    if (this._heroFrameId !== null) {
      window.cancelAnimationFrame(this._heroFrameId);
    }
  }

  private _initMotion(): void {
    this._initScrollReveal();
    this._initCountUp();
    this._initProcessTimeline();
    this._initParallax();
    this._initServiceSpotlight();
    this._initHeroParticles();
    this._initCaseCharts();
  }

  private _initScrollReveal(): void {
    const elements = this._queryAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    this._intersectionObservers.push(observer);
  }

  private _initCountUp(): void {
    const elements = this._queryAll<HTMLElement>('[data-count]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const target = Number.parseFloat(element.dataset['count'] ?? '0');
          const start = performance.now();
          const duration = 1800;
          const isFloat = target % 1 !== 0;
          const formatValue = (value: number) =>
            isFloat ? value.toFixed(1) : Math.round(value).toLocaleString();

          element.textContent = formatValue(0);

          const tick = (now: number): void => {
            const time = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - time, 3);

            element.textContent = formatValue(target * eased);

            if (time < 1) {
              window.requestAnimationFrame(tick);
            }
          };

          window.requestAnimationFrame(tick);
          observer.unobserve(element);
        });
      },
      { threshold: 0.5 },
    );

    elements.forEach((element) => observer.observe(element));
    this._intersectionObservers.push(observer);
  }

  private _initProcessTimeline(): void {
    const wrap = this._elementRef.nativeElement.querySelector<HTMLElement>('.process-wrap');

    if (!wrap) {
      return;
    }

    const line = wrap.querySelector<HTMLElement>('.process-line');
    const steps = Array.from(wrap.querySelectorAll<HTMLElement>('.process-step'));
    const stepCount = steps.length;

    const onScroll = (): void => {
      const rect = wrap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.25;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const progress = Math.max(0, Math.min(1, traveled / total));

      line?.style.setProperty('--progress', progress.toFixed(3));

      steps.forEach((step, index) => {
        const threshold = (index + 0.5) / stepCount;
        step.classList.toggle('active', progress >= threshold);
      });
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    this._cleanupHandlers.push(() => document.removeEventListener('scroll', onScroll));
    onScroll();
  }

  private _initParallax(): void {
    const layers = this._queryAll<HTMLElement>('[data-parallax]');
    let frameId: number | null = null;

    const onScroll = (): void => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        layers.forEach((layer) => {
          const speed = Number.parseFloat(layer.dataset['parallax'] ?? '0.1');
          layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });

        frameId = null;
      });
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    this._cleanupHandlers.push(() => {
      document.removeEventListener('scroll', onScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    });
  }

  private _initServiceSpotlight(): void {
    this._queryAll<HTMLElement>('.service-card').forEach((card) => {
      const onMouseMove = (event: MouseEvent): void => {
        const rect = card.getBoundingClientRect();

        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      };

      card.addEventListener('mousemove', onMouseMove);
      this._cleanupHandlers.push(() => card.removeEventListener('mousemove', onMouseMove));
    });
  }

  private _initHeroParticles(): void {
    const canvas = this._elementRef.nativeElement.querySelector<HTMLCanvasElement>('#hero-canvas');
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const points: ParticlePoint[] = [];
    const pointer: PointerState = { x: -9999, y: -9999, active: false };

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();

      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const init = (): void => {
      const pointCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000));

      points.length = 0;

      for (let index = 0; index < pointCount; index += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.2 + 0.6,
          accent: Math.random() < 0.18,
        });
      }
    };

    const onMouseMove = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onMouseLeave = (): void => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onResize = (): void => {
      resize();
      init();
    };

    const step = (): void => {
      this._drawHeroParticles(context, points, pointer, width, height);
      this._heroFrameId = window.requestAnimationFrame(step);
    };

    resize();
    init();
    step();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    this._cleanupHandlers.push(() => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    });
  }

  private _drawHeroParticles(
    context: CanvasRenderingContext2D,
    points: ParticlePoint[],
    pointer: PointerState,
    width: number,
    height: number,
  ): void {
    context.clearRect(0, 0, width, height);

    const gradient = context.createRadialGradient(
      width / 2,
      height * 0.6,
      0,
      width / 2,
      height * 0.6,
      Math.max(width, height) * 0.7,
    );

    gradient.addColorStop(0, 'rgba(220, 38, 50, 0.06)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    points.forEach((point) => this._updateAndDrawPoint(context, point, pointer, width, height));
    this._drawHeroConnections(context, points);
  }

  private _updateAndDrawPoint(
    context: CanvasRenderingContext2D,
    point: ParticlePoint,
    pointer: PointerState,
    width: number,
    height: number,
  ): void {
    point.x += point.vx;
    point.y += point.vy;

    if (pointer.active) {
      const dx = point.x - pointer.x;
      const dy = point.y - pointer.y;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < 18000) {
        const force = ((18000 - distanceSquared) / 18000) * 0.6;
        const distance = Math.sqrt(distanceSquared) || 1;

        point.x += (dx / distance) * force;
        point.y += (dy / distance) * force;
      }
    }

    if (point.x < -10) {
      point.x = width + 10;
    }

    if (point.x > width + 10) {
      point.x = -10;
    }

    if (point.y < -10) {
      point.y = height + 10;
    }

    if (point.y > height + 10) {
      point.y = -10;
    }

    context.beginPath();
    context.arc(point.x, point.y, point.r, 0, Math.PI * 2);

    if (point.accent) {
      context.fillStyle = 'rgba(244, 70, 80, 0.85)';
      context.shadowColor = 'rgba(244, 70, 80, 0.7)';
      context.shadowBlur = 10;
    } else {
      context.fillStyle = 'rgba(220, 220, 230, 0.55)';
      context.shadowBlur = 0;
    }

    context.fill();
    context.shadowBlur = 0;
  }

  private _drawHeroConnections(context: CanvasRenderingContext2D, points: ParticlePoint[]): void {
    for (let firstIndex = 0; firstIndex < points.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < points.length; secondIndex += 1) {
        const first = points[firstIndex];
        const second = points[secondIndex];
        const dx = first.x - second.x;
        const dy = first.y - second.y;
        const distanceSquared = dx * dx + dy * dy;
        const maxDistanceSquared = 140 * 140;

        if (distanceSquared >= maxDistanceSquared) {
          continue;
        }

        const opacity = 1 - distanceSquared / maxDistanceSquared;
        context.strokeStyle =
          first.accent || second.accent
            ? `rgba(244, 70, 80, ${opacity * 0.35})`
            : `rgba(220, 220, 235, ${opacity * 0.12})`;
        context.lineWidth = 0.6;
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.stroke();
      }
    }
  }

  private _initCaseCharts(): void {
    const canvases = this._queryAll<HTMLCanvasElement>('canvas.case-chart');

    const drawCharts = (): void => {
      canvases.forEach((canvas) => this._drawCaseChart(canvas));
    };

    window.requestAnimationFrame(drawCharts);
    window.addEventListener('resize', drawCharts);
    this._cleanupHandlers.push(() => window.removeEventListener('resize', drawCharts));
  }

  private _drawCaseChart(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const points = this._parseChartPoints(canvas.dataset['points']);
    const max = Math.max(...points);
    const min = Math.min(...points);
    const xStep = width / (points.length - 1);
    const toY = (value: number): number =>
      height - 8 - ((value - min) / (max - min || 1)) * (height - 16);

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(220, 38, 50, 0.35)');
    gradient.addColorStop(1, 'rgba(220, 38, 50, 0)');

    context.beginPath();
    context.moveTo(0, height);
    points.forEach((value, index) => context.lineTo(index * xStep, toY(value)));
    context.lineTo(width, height);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();

    context.beginPath();
    points.forEach((value, index) => {
      const x = index * xStep;
      const y = toY(value);

      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.strokeStyle = 'rgba(244, 70, 80, 0.9)';
    context.lineWidth = 1.5;
    context.shadowColor = 'rgba(244, 70, 80, 0.6)';
    context.shadowBlur = 8;
    context.stroke();
    context.shadowBlur = 0;

    const lastX = (points.length - 1) * xStep;
    const lastY = toY(points[points.length - 1]);
    context.beginPath();
    context.arc(lastX, lastY, 3, 0, Math.PI * 2);
    context.fillStyle = '#fff';
    context.shadowColor = 'rgba(244, 70, 80, 0.9)';
    context.shadowBlur = 10;
    context.fill();
  }

  private _parseChartPoints(value: string | undefined): number[] {
    try {
      const parsed = JSON.parse(value ?? '[]') as unknown;

      if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'number')) {
        return parsed.length > 1 ? parsed : [10, 28, 18, 42, 36, 58, 52, 74, 70];
      }
    } catch {
      return [10, 28, 18, 42, 36, 58, 52, 74, 70];
    }

    return [10, 28, 18, 42, 36, 58, 52, 74, 70];
  }

  private _queryAll<T extends Element>(selector: string): T[] {
    return Array.from(this._elementRef.nativeElement.querySelectorAll<T>(selector));
  }
}

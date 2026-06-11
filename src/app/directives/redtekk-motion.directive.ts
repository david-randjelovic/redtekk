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

import { HeroBuildBox } from '../interfaces/motion.interfaces';

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
  private readonly _heroBuildCell = 64;
  private readonly _heroBuildMaxBoxes = 7;

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
    this._initHeroBuildScene();
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

  private _initHeroBuildScene(): void {
    const canvas = this._elementRef.nativeElement.querySelector<HTMLCanvasElement>('#hero-build');
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const boxes: HeroBuildBox[] = [];

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();

      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const step = (now: number): void => {
      this._drawHeroBuildScene(context, boxes, width, height, now);
      this._heroFrameId = window.requestAnimationFrame(step);
    };

    const onResize = (): void => {
      resize();
    };

    resize();

    const initialSpawnIds = Array.from({ length: 4 }, (_, index) =>
      window.setTimeout(() => this._spawnHeroBuildBox(boxes, width, height), index * 250),
    );
    const spawnIntervalId = window.setInterval(
      () => this._spawnHeroBuildBox(boxes, width, height),
      900,
    );

    this._heroFrameId = window.requestAnimationFrame(step);
    window.addEventListener('resize', onResize);
    this._cleanupHandlers.push(() => {
      window.removeEventListener('resize', onResize);
      window.clearInterval(spawnIntervalId);
      initialSpawnIds.forEach((spawnId) => window.clearTimeout(spawnId));
    });
  }

  private _drawHeroBuildScene(
    context: CanvasRenderingContext2D,
    boxes: HeroBuildBox[],
    width: number,
    height: number,
    now: number,
  ): void {
    context.clearRect(0, 0, width, height);
    this._drawHeroBuildConnections(context, boxes, now);

    for (let index = boxes.length - 1; index >= 0; index -= 1) {
      const box = boxes[index];

      if (!box || !this._drawHeroBuildBox(context, box, now)) {
        boxes.splice(index, 1);
      }
    }
  }

  private _spawnHeroBuildBox(boxes: HeroBuildBox[], width: number, height: number): void {
    if (boxes.length >= this._heroBuildMaxBoxes || width <= 0 || height <= 0) {
      return;
    }

    const boxWidth = (1 + Math.floor(Math.random() * 4)) * this._heroBuildCell;
    const boxHeight = (1 + Math.floor(Math.random() * 2)) * this._heroBuildCell;
    const margin = this._heroBuildCell;
    const maxX = Math.max(margin, width - boxWidth - margin * 2);
    const maxY = Math.max(margin, height - boxHeight - margin * 2);
    let x = margin;
    let y = margin;
    let attempts = 0;

    do {
      x = this._snapHeroBuildValue(margin + Math.random() * maxX);
      y = this._snapHeroBuildValue(margin + Math.random() * maxY);
      attempts += 1;
    } while (
      attempts < 8 &&
      this._heroBuildIntersectsCenter(x, y, boxWidth, boxHeight, width, height)
    );

    boxes.push({
      x,
      y,
      width: boxWidth,
      height: boxHeight,
      born: performance.now(),
      lifeIn: 900,
      lifeHold: 4200,
      lifeOut: 1100,
      accent: Math.random() < 0.28,
      filled: Math.random() < 0.35,
    });
  }

  private _heroBuildIntersectsCenter(
    x: number,
    y: number,
    width: number,
    height: number,
    canvasWidth: number,
    canvasHeight: number,
  ): boolean {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const reservedWidth = Math.min(canvasWidth * 0.55, 720);
    const reservedHeight = Math.min(canvasHeight * 0.45, 380);
    const reservedX = centerX - reservedWidth / 2;
    const reservedY = centerY - reservedHeight / 2;

    return !(
      x + width < reservedX ||
      x > reservedX + reservedWidth ||
      y + height < reservedY ||
      y > reservedY + reservedHeight
    );
  }

  private _snapHeroBuildValue(value: number): number {
    return Math.round(value / this._heroBuildCell) * this._heroBuildCell;
  }

  private _drawHeroBuildConnections(
    context: CanvasRenderingContext2D,
    boxes: HeroBuildBox[],
    now: number,
  ): void {
    if (boxes.length < 2) {
      return;
    }

    context.save();
    context.lineWidth = 0.6;
    context.setLineDash([3, 5]);
    context.lineDashOffset = -(now / 90);

    for (let index = 0; index < boxes.length - 1; index += 1) {
      const first = boxes[index];
      const second = boxes[index + 1];

      if (
        !first ||
        !second ||
        !this._isHeroBuildBoxAlive(first, now) ||
        !this._isHeroBuildBoxAlive(second, now)
      ) {
        continue;
      }

      context.strokeStyle = 'rgba(244, 70, 80, 0.18)';
      context.beginPath();
      context.moveTo(first.x + first.width / 2, first.y + first.height / 2);
      context.lineTo(second.x + second.width / 2, second.y + second.height / 2);
      context.stroke();
    }

    context.setLineDash([]);
    context.restore();
  }

  private _drawHeroBuildBox(
    context: CanvasRenderingContext2D,
    box: HeroBuildBox,
    now: number,
  ): boolean {
    const totalLifetime = box.lifeIn + box.lifeHold + box.lifeOut;
    const age = now - box.born;

    if (age > totalLifetime) {
      return false;
    }

    let progress = 1;
    let alpha = 1;

    if (age < box.lifeIn) {
      progress = age / box.lifeIn;
      alpha = progress;
    } else if (age > box.lifeIn + box.lifeHold) {
      const outProgress = (age - box.lifeIn - box.lifeHold) / box.lifeOut;
      alpha = 1 - outProgress;
    }

    const eased = 1 - Math.pow(1 - progress, 3);
    const perimeter = 2 * (box.width + box.height);
    const drawn = perimeter * eased;

    context.save();
    context.translate(box.x, box.y);
    this._drawHeroBuildFill(context, box, progress, alpha);
    this._drawHeroBuildPerimeter(context, box, drawn, alpha, now);
    this._drawHeroBuildAnchors(context, box, progress, alpha);
    context.restore();

    return true;
  }

  private _isHeroBuildBoxAlive(box: HeroBuildBox, now: number): boolean {
    return now - box.born < box.lifeIn + box.lifeHold + box.lifeOut;
  }

  private _drawHeroBuildFill(
    context: CanvasRenderingContext2D,
    box: HeroBuildBox,
    progress: number,
    alpha: number,
  ): void {
    if (!box.filled || progress <= 0.5) {
      return;
    }

    const fillAlpha = (progress - 0.5) * 2 * alpha;
    const pad = 10;

    context.fillStyle = box.accent
      ? `rgba(244, 70, 80, ${0.04 * fillAlpha})`
      : `rgba(255, 255, 255, ${0.022 * fillAlpha})`;
    context.fillRect(0, 0, box.width, box.height);

    if (box.height < this._heroBuildCell) {
      return;
    }

    this._drawHeroBuildBar(context, box, pad + 4, Math.min(box.width - pad * 2, box.width * 0.4), fillAlpha);
    this._drawHeroBuildBar(context, box, pad + 14, Math.min(box.width - pad * 2, box.width * 0.7), fillAlpha);

    if (box.height >= this._heroBuildCell * 2) {
      this._drawHeroBuildBar(context, box, pad + 28, Math.min(box.width - pad * 2, box.width * 0.5), fillAlpha);
    }
  }

  private _drawHeroBuildBar(
    context: CanvasRenderingContext2D,
    box: HeroBuildBox,
    y: number,
    width: number,
    fillAlpha: number,
  ): void {
    context.fillStyle = box.accent
      ? `rgba(244, 70, 80, ${0.18 * fillAlpha})`
      : `rgba(255, 255, 255, ${0.07 * fillAlpha})`;
    context.fillRect(10, y, width, 4);
  }

  private _drawHeroBuildPerimeter(
    context: CanvasRenderingContext2D,
    box: HeroBuildBox,
    drawn: number,
    alpha: number,
    now: number,
  ): void {
    const stroke = box.accent
      ? `rgba(244, 90, 100, ${0.85 * alpha})`
      : `rgba(255, 255, 255, ${0.45 * alpha})`;

    context.strokeStyle = stroke;
    context.lineWidth = 1;
    context.setLineDash([4, 4]);
    context.lineDashOffset = -(now / 60);
    context.shadowBlur = box.accent ? 14 : 0;
    context.shadowColor = 'rgba(244, 70, 80, 0.6)';

    let remaining = drawn;

    context.beginPath();
    remaining = this._drawHeroBuildSegment(context, 0, 0, box.width, 0, remaining);
    remaining = this._drawHeroBuildSegment(context, box.width, 0, box.width, box.height, remaining);
    remaining = this._drawHeroBuildSegment(context, box.width, box.height, 0, box.height, remaining);
    this._drawHeroBuildSegment(context, 0, box.height, 0, 0, remaining);
    context.stroke();
    context.shadowBlur = 0;
    context.setLineDash([]);
  }

  private _drawHeroBuildSegment(
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    remaining: number,
  ): number {
    if (remaining <= 0) {
      return remaining;
    }

    const length = Math.abs(endX - startX) + Math.abs(endY - startY);
    const progress = Math.min(1, remaining / length);

    context.moveTo(startX, startY);
    context.lineTo(
      this._lerpHeroBuildValue(startX, endX, progress),
      this._lerpHeroBuildValue(startY, endY, progress),
    );

    return remaining - length;
  }

  private _drawHeroBuildAnchors(
    context: CanvasRenderingContext2D,
    box: HeroBuildBox,
    progress: number,
    alpha: number,
  ): void {
    if (progress <= 0.9) {
      return;
    }

    context.fillStyle = box.accent
      ? `rgba(255, 110, 120, ${alpha})`
      : `rgba(220, 220, 235, ${0.6 * alpha})`;
    context.fillRect(-2, -2, 4, 4);
    context.fillRect(box.width - 2, -2, 4, 4);
    context.fillRect(-2, box.height - 2, 4, 4);
    context.fillRect(box.width - 2, box.height - 2, 4, 4);
  }

  private _lerpHeroBuildValue(start: number, end: number, progress: number): number {
    return start + (end - start) * progress;
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

import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { RouterLink } from '@angular/router';

import { WORK_PROJECTS } from '../../../data/work-projects';
import { WorkProject } from '../../../interfaces/work-page.interfaces';
import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

interface NumberedProject {
  readonly project: WorkProject;
  readonly num: string;
}

const FEATURED_COUNT = 2;

@Component({
  standalone: true,
  selector: 'app-work',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './work.component.html',
})
export class WorkComponent implements OnInit {
  private readonly _seo = inject(SeoService);

  protected readonly calendar = inject(CalendarModalService);

  protected readonly featured: ReadonlyArray<NumberedProject> = WORK_PROJECTS.slice(
    0,
    FEATURED_COUNT,
  ).map((project, index) => ({ project, num: this._formatNum(index) }));

  protected readonly gridProjects: ReadonlyArray<NumberedProject> = WORK_PROJECTS.slice(
    FEATURED_COUNT,
  ).map((project, index) => ({ project, num: this._formatNum(index + FEATURED_COUNT) }));

  protected readonly totalCount = WORK_PROJECTS.length;
  protected readonly publicCount = WORK_PROJECTS.filter((project) => !project.nda).length;
  protected readonly ndaCount = this.totalCount - this.publicCount;

  public ngOnInit(): void {
    this._seo.apply({
      title: 'Our Work & Case Studies | Redtekk',
      description:
        'From marketplaces and ERPs to solar platforms and online stores: case studies from the careers of the people behind Redtekk.',
      path: '/work',
    });
  }

  private _formatNum(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}

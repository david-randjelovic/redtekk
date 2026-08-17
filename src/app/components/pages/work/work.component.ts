import { Component, OnInit, inject } from '@angular/core';
import { SeoService, SITE_URL } from '../../../services/seo.service';
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
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Redtekk case studies',
          numberOfItems: WORK_PROJECTS.length,
          itemListElement: WORK_PROJECTS.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: project.name,
            url: `${SITE_URL}/work/${project.slug}`,
          })),
        },
      ],
    });
  }

  private _formatNum(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}

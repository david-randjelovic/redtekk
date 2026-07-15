import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { WORK_PROJECT_DETAILS } from '../../../data/work-project-details';
import { WORK_PROJECTS } from '../../../data/work-projects';
import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { SeoService, toMetaDescription } from '../../../services/seo.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-work-detail',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './work-detail.component.html',
})
export class WorkDetailComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _seo = inject(SeoService);

  protected readonly calendar = inject(CalendarModalService);

  private readonly _paramMap = toSignal(this._route.paramMap, {
    initialValue: this._route.snapshot.paramMap,
  });

  protected readonly project = computed(() => {
    const slug = this._paramMap().get('id');

    return WORK_PROJECTS.find((entry) => entry.slug === slug);
  });

  protected readonly detail = computed(() => {
    const slug = this._paramMap().get('id');

    return WORK_PROJECT_DETAILS.find((entry) => entry.slug === slug);
  });

  /** Previous/next project for footer navigation, wrapping around the list. */
  protected readonly nextProject = computed(() => {
    const current = this.project();

    if (!current) {
      return undefined;
    }

    const index = WORK_PROJECTS.indexOf(current);

    return WORK_PROJECTS[(index + 1) % WORK_PROJECTS.length];
  });

  constructor() {
    effect(() => {
      const project = this.project();
      const detail = this.detail();

      if (!project || !detail) {
        this._router.navigateByUrl('/work');
        return;
      }

      this._seo.apply({
        title: `${project.name} Case Study | Redtekk`,
        description: toMetaDescription(detail.summary),
        path: `/work/${project.slug}`,
        image: project.image,
      });
    });
  }
}

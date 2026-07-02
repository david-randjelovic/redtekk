import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SERVICE_PAGES } from '../../../data/service-pages';
import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-service-detail',
  imports: [ButtonComponent, RedtekkMotionDirective, RouterLink],
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _title = inject(Title);

  protected readonly calendar = inject(CalendarModalService);

  private readonly _paramMap = toSignal(this._route.paramMap, { initialValue: this._route.snapshot.paramMap });

  protected readonly service = computed(() => {
    const slug = this._paramMap().get('id');

    return SERVICE_PAGES.find((entry) => entry.slug === slug);
  });

  constructor() {
    effect(() => {
      const service = this.service();

      if (!service) {
        this._router.navigateByUrl('/');
        return;
      }

      this._title.setTitle(`${service.title} | RedTekk`);
    });
  }
}

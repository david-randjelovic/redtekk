import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SERVICE_PAGES } from '../../../data/service-pages';
import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { SITE_URL, SeoService, toMetaDescription } from '../../../services/seo.service';
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
  private readonly _seo = inject(SeoService);

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

      const url = `${SITE_URL}/services/${service.slug}`;

      this._seo.apply({
        title: `${service.title} | Redtekk`,
        description: toMetaDescription(service.intro),
        path: `/services/${service.slug}`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.intro,
            url,
            areaServed: 'Worldwide',
            provider: { '@type': 'Organization', name: 'Redtekk', url: SITE_URL },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: service.title, item: url },
            ],
          },
        ],
      });
    });
  }
}

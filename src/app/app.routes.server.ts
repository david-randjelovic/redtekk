import { RenderMode, ServerRoute } from '@angular/ssr';

import { SERVICE_PAGES } from './data/service-pages';
import { WORK_PROJECTS } from './data/work-projects';

/**
 * Every route is prerendered to static HTML at build time, so crawlers and
 * social scrapers get full content and per-page meta tags without executing
 * JavaScript. Parameterized routes list their slugs explicitly.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'work/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return WORK_PROJECTS.map((project) => ({ id: project.slug }));
    },
  },
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICE_PAGES.map((service) => ({ id: service.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

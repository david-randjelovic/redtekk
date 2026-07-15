import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Pages are prerendered to static HTML; hydration reuses that DOM instead
    // of re-rendering from scratch, and replays events fired before boot.
    // Hydration also covers the old "footer under the navbar" hard-load flash
    // that withEnabledBlockingInitialNavigation used to prevent: the full page
    // arrives as HTML, so there is no empty router outlet to paint. The two
    // options are mutually exclusive (NG05001), so blocking navigation is out.
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    )
  ]
};

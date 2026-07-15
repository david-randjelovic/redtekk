import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router, RouterOutlet, Scroll } from '@angular/router';

import { CalendarModalComponent } from './components/layout/calendar-modal/calendar-modal.component';
import { CookieConsentComponent } from './components/layout/cookie-consent/cookie-consent.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CalendarModalComponent, CookieConsentComponent, FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly _document = inject(DOCUMENT);

  constructor(router: Router) {
    // Titles and meta tags are set per page through SeoService.

    // Scroll handling is a browser concern; during prerendering there is no
    // viewport and NavigationEnd fires once for the initial render.
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    // The stylesheet sets `html { scroll-behavior: smooth }` for in-page anchor
    // links, which also makes the router's own scroll reset animate - and with
    // view transitions that reset runs late enough to be interrupted mid-way,
    // leaving the new page stranded at the old scroll offset (the "footer under
    // the navbar" flicker). Reset the scroll ourselves with an explicit
    // `behavior: 'instant'` (which overrides the CSS) on NavigationEnd, i.e.
    // inside the view transition's DOM-update phase, so the new page's snapshot
    // is captured already at the top. The router's later reset is then a no-op.
    const view = this._document.defaultView;
    let isPopstate = false;

    router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        isPopstate = event.navigationTrigger === 'popstate';
      } else if (event instanceof NavigationEnd) {
        if (!isPopstate && !router.parseUrl(event.urlAfterRedirects).fragment) {
          view?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      } else if (event instanceof Scroll && event.position) {
        // back/forward: land on the saved position instantly instead of the
        // router's CSS-smooth (and interruptible) animated restore
        view?.scrollTo({ left: event.position[0], top: event.position[1], behavior: 'instant' });
      }
    });
  }
}

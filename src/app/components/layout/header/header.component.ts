import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, OnInit, PLATFORM_ID, inject } from '@angular/core';

import { NavLink } from '../../../interfaces/navigation.interfaces';
import { CalendarModalService } from '../../../services/calendar-modal.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { BrandComponent } from '../brand/brand.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  standalone: true,
  selector: 'app-site-header',
  imports: [BrandComponent, ButtonComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected readonly calendar = inject(CalendarModalService);

  protected readonly navLinks: ReadonlyArray<NavLink> = [
    {
      label: 'Services',
      children: [
        { label: 'Design', route: '/services/design' },
        { label: 'Development', route: '/services/development' },
        { label: 'AI Solutions', route: '/services/ai' },
        { label: 'Integrations', route: '/services/integrations' },
        { label: 'Optimization', route: '/services/optimization' },
        { label: 'Support', route: '/services/support' },
      ],
    },
    { label: 'Process', route: '/process' },
    { label: 'Work', route: '/work' },
    {
      label: 'About',
      children: [
        { label: 'About us', route: '/about' },
        { label: 'Technologies we use', route: '/technologies' },
        { label: 'How we use AI?', route: '/how-we-use-ai' },
      ],
    },
    { label: 'Contact', route: '/contact' },
  ];

  protected isScrolled = false;

  private readonly _platformId = inject(PLATFORM_ID);

  public ngOnInit(): void {
    // window only exists in the browser; during prerendering the initial
    // "not scrolled" state is correct anyway.
    if (isPlatformBrowser(this._platformId)) {
      this.onWindowScroll();
    }
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.isScrolled = window.scrollY > 30;
  }
}

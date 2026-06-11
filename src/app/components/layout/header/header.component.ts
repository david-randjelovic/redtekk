import { Component, HostListener, OnInit, inject } from '@angular/core';

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
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  protected isScrolled = false;

  public ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.isScrolled = window.scrollY > 30;
  }
}

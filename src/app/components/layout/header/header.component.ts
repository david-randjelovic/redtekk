import { Component, HostListener, OnInit } from '@angular/core';

import { NavLink } from '../../../interfaces/navigation.interfaces';
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
  protected readonly navLinks: ReadonlyArray<NavLink> = [
    { label: 'Services', href: '#services' },
    { label: 'Why us', href: '#why' },
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

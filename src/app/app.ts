import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
export class App {}

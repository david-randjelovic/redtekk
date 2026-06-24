import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pages/home/home.component').then((component) => component.HomeComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./components/pages/privacy-policy/privacy-policy.component').then(
        (component) => component.PrivacyPolicyComponent,
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/pages/about/about.component').then((component) => component.AboutComponent),
  },
  {
    path: 'cookie-policy',
    loadComponent: () =>
      import('./components/pages/cookie-policy/cookie-policy.component').then(
        (component) => component.CookiePolicyComponent,
      ),
  },
  {
    path: 'technologies',
    loadComponent: () =>
      import('./components/pages/technologies/technologies.component').then(
        (component) => component.TechnologiesComponent,
      ),
  },
  {
    path: 'how-we-use-ai',
    loadComponent: () =>
      import('./components/pages/how-we-use-ai/how-we-use-ai.component').then(
        (component) => component.HowWeUseAiComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

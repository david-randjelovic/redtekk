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
    path: 'contact',
    loadComponent: () =>
      import('./components/pages/contact/contact.component').then(
        (component) => component.ContactComponent,
      ),
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./components/pages/work/work.component').then((component) => component.WorkComponent),
  },
  {
    path: 'process',
    loadComponent: () =>
      import('./components/pages/process/process.component').then(
        (component) => component.ProcessComponent,
      ),
  },
  {
    path: 'services/:id',
    loadComponent: () =>
      import('./components/pages/service-detail/service-detail.component').then(
        (component) => component.ServiceDetailComponent,
      ),
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

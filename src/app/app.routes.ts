import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pages/home/home.component').then((component) => component.HomeComponent),
  },
];

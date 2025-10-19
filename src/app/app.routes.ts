import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'vercarrito',
    loadComponent: () => import('./vercarrito/vercarrito.page').then( m => m.VercarritoPage)
  },
];

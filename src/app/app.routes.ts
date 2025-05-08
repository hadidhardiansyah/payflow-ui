import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth.routes';
import { DASHBOARD_ROUTES } from './modules/dashboard/dahsboard.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { INVOICE_ROUTES } from './modules/invoice/invoice.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
  {
    path: 'dashboard',
    children: DASHBOARD_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice',
    children: INVOICE_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];

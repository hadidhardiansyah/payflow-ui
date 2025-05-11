import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './modules/auth/store/effects/auth.effects';
import { authReducer } from './modules/auth/store/reducers/auth.reducer';
import { AuthGuard } from './core/guards/auth.guard';
import { sidebarReducer } from './modules/dashboard/store/reducers/sidebar.reducers';
import { invoiceReducer } from './modules/invoice/store/reducers/invoice.reducer';
import { InvoiceEffects } from './modules/invoice/store/effects/invoice.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthGuard,
    provideHttpClient(),
    provideStore(),
    provideStore({
      auth: authReducer,
      sidebar: sidebarReducer,
      invoice: invoiceReducer,
    }),
    provideEffects([AuthEffects]),
    provideEffects([InvoiceEffects]),
  ],
};

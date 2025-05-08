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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthGuard,
    provideHttpClient(),
    provideStore(),
    provideState('auth', authReducer),
    provideState('sidebar', sidebarReducer),
    provideEffects([AuthEffects]),
  ],
};

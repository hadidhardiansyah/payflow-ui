import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../service/auth.service';
import * as AuthActions from '../actions/auth.action';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credential }) =>
        this.authService.login(credential).pipe(
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error: HttpErrorResponse) =>
            of(
              AuthActions.loginFailure({
                error: error?.error?.error?.businessErrorDescription,
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ response }) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          this.router.navigate(['dashboard']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ newData }) =>
        this.authService.register(newData).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              AuthActions.registerFailure({
                error: error?.error?.error?.businessErrorDescription,
              })
            )
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['auth', 'activate-account']);
        })
      ),
    { dispatch: false }
  );

  activateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.activateAccount),
      exhaustMap(({ code }) =>
        this.authService.activateAccount(code).pipe(
          map((res) =>
            AuthActions.activateAccountSuccess({ message: res.message })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              AuthActions.activateAccountFailure({
                error: error?.error?.error?.businessErrorDescription,
              })
            )
          )
        )
      )
    )
  );
}

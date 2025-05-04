import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { LoginResponseModel } from '../../models/login.model';

export interface AuthState {
  user: LoginResponseModel | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

export const authReducer = createReducer(
  initialState,
  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Activate Account
  on(AuthActions.activateAccount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.activateAccountSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),

  on(AuthActions.activateAccountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Error Auth
  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null,
  })),

  // Clear message
  on(AuthActions.clearAuthMessage, (state) => ({
    ...state,
    message: null,
  }))
);

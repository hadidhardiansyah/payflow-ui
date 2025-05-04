import { RegisterModel } from './../../models/register.model';
import { LoginModel, LoginResponseModel } from './../../models/login.model';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ credential: LoginModel }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LoginResponseModel }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ newData: RegisterModel }>()
);

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const activateAccount = createAction(
  '[Auth] Activate Account',
  props<{ code: string }>()
);

export const activateAccountSuccess = createAction(
  '[Auth] Activate Account Success',
  props<{ message: string }>()
);

export const activateAccountFailure = createAction(
  '[Auth] Activate Account Failure',
  props<{ error: string }>()
);

export const clearAuthMessage = createAction('[Auth] Clear Message');

export const clearAuthError = createAction('[Auth] Clear Error');

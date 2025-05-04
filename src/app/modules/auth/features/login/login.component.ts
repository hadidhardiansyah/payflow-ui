import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordComplexityValidator } from '../../../../shared/validators/password.validator';
import { ShareErrorModalComponent } from '../../../../shared/components/share-error-modal/share-error-modal.component';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.action';
import { Observable } from 'rxjs';
import {
  selectAuthError,
  selectAuthLoading,
} from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [
    // Angular Modules
    CommonModule,
    ReactiveFormsModule,

    // Angular Components
    ShareErrorModalComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  private store = inject(Store);

  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);

  loginForm: FormGroup = new FormGroup({
    companyId: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      passwordComplexityValidator,
    ]),
  });

  constructor(private router: Router) {}

  get companyId() {
    return this.loginForm.get('companyId');
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const credential = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ credential: credential }));
  }

  onCloseErrorModal() {
    this.store.dispatch(AuthActions.clearAuthError());
  }

  onNavigateToRegister() {
    this.router.navigate(['auth', 'register']);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/register.model';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordComplexityValidator } from '../../../../shared/validators/password.validator';
import { ShareErrorModalComponent } from '../../../../shared/components/share-error-modal/share-error-modal.component';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.action';
import {
  selectAuthError,
  selectAuthLoading,
} from '../../store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    // Angular Modules
    CommonModule,
    ReactiveFormsModule,

    // Angular Components
    ShareErrorModalComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  private store = inject(Store);

  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);

  allRoles: string[] = ['MAKER', 'APPROVER'];

  registerForm: FormGroup = new FormGroup({
    companyId: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      passwordComplexityValidator,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    roles: new FormArray([]),
  });

  constructor(private router: Router) {}

  get companyId() {
    return this.registerForm.get('companyId');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get roles() {
    return this.registerForm.get('roles');
  }

  get canSubmit(): boolean {
    return this.registerForm.valid && this.registerForm.value.roles.length > 0;
  }

  onRoleChange(event: any) {
    const rolesFormArray = this.registerForm.get('roles') as FormArray;
    const selectedRole = event.target.value;

    if (event.target.checked) {
      rolesFormArray.push(new FormControl(selectedRole));
    } else {
      const index = rolesFormArray.controls.findIndex(
        (ctrl) => ctrl.value === selectedRole
      );
      if (index !== -1) {
        rolesFormArray.removeAt(index);
      }
    }
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const newData: RegisterModel = this.registerForm.value;
    this.store.dispatch(AuthActions.register({ newData: newData }));
  }

  onCloseErrorModal() {
    this.store.dispatch(AuthActions.clearAuthError());
  }

  onNavigateToLogin() {
    this.router.navigate(['auth', 'login']);
  }
}

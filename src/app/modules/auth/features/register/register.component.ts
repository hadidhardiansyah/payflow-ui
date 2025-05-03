import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
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

  showErrorModal: boolean = false;

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
    const newData: RegisterModel = this.registerForm.value;

    this.authService.register(newData).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.router.navigate(['auth', 'activate-account']);
          this.registerForm.reset();
        }
      },
      error: (err) => {
        this.errorMessage = err.error.error.businessErrorDescription;
        this.showErrorModal = true;
      },
    });
  }

  onNavigateToLogin() {
    this.router.navigate(['auth', 'login']);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginModel, LoginResponseModel } from '../../models/login.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordComplexityValidator } from '../../../../shared/validators/password.validator';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    companyId: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      passwordComplexityValidator,
    ]),
  });

  showErrorModal: boolean = false;

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
    const credentials: LoginModel = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res: LoginResponseModel) => {
        localStorage.setItem('authToken', res.token);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.error.businessErrorDescription;
        this.showErrorModal = true;
      },
    });
  }

  onNavigateToRegister() {
    this.router.navigate(['auth', 'register']);
  }
}

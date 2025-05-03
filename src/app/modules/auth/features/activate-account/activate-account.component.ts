import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ShareErrorModalComponent } from '../../../../shared/components/share-error-modal/share-error-modal.component';

@Component({
  selector: 'app-activate-account',
  imports: [
    // Angular Modules
    CommonModule,
    ReactiveFormsModule,

    // Angular Components
    ShareErrorModalComponent,
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
  standalone: true,
})
export class ActivateAccountComponent implements OnInit {
  form: FormGroup = new FormGroup({
    code: new FormArray([]),
  });

  showErrorModal: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const codeArray = this.form.get('code') as FormArray;
    for (let i = 0; i < 6; i++) {
      codeArray.push(
        new FormControl('', [Validators.required, Validators.pattern('[0-9]')])
      );
    }
  }

  get codeArray(): FormArray {
    return this.form.get('code') as FormArray;
  }

  onInput(event: any, i: number) {
    const input = event.target;
    const value = input.value;

    if (value.length === 1 && i < 5) {
      this.inputs.get(i + 1)?.nativeElement.focus();
    } else if (
      value.length === 0 &&
      i > 0 &&
      event.inputType === 'deleteContentBackward'
    ) {
      this.inputs.get(i - 1)?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const digits = pasteData.replace(/\D/g, '').slice(0, 6).split('');

    digits.forEach((digit, index) => {
      if (this.codeArray.at(index)) {
        this.codeArray.at(index).setValue(digit);
      }
    });

    const lastFilled = digits.length - 1;
    const input = this.inputs.get(lastFilled);
    if (input) {
      input.nativeElement.focus();
    }
  }

  onActivate() {
    if (this.form.valid) {
      const code = this.codeArray.value.join('');

      this.authService.activateAccount(code).subscribe({
        next: (res: { status: string; message: string }) => {
          this.successMessage = res?.message;
        },
        error: (err) => {
          this.errorMessage = err.error.error.businessErrorDescription;
          this.showErrorModal = true;
        },
      });
    }
  }

  onNavigateToLogin() {
    this.router.navigate(['auth', 'login']);
  }
}

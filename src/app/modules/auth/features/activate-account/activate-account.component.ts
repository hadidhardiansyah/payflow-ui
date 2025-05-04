import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
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
import { Router } from '@angular/router';
import { ShareErrorModalComponent } from '../../../../shared/components/share-error-modal/share-error-modal.component';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.action';
import { Observable } from 'rxjs';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthMessage,
} from '../../store/selectors/auth.selectors';

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
  private store = inject(Store);

  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  successMessage$: Observable<string | null> =
    this.store.select(selectAuthMessage);
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);

  form: FormGroup = new FormGroup({
    code: new FormArray([]),
  });

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  constructor(private router: Router) {}

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
      this.store.dispatch(AuthActions.activateAccount({ code }));
    }
  }

  onCloseErrorModal() {
    this.store.dispatch(AuthActions.clearAuthError());
  }

  onNavigateToLogin() {
    this.router.navigate(['auth', 'login']);
  }
}

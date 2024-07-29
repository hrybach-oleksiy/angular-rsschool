import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../services/login.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, CustomButtonComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  public emailErrorMessage = signal('');
  // public passwordErrorMessage = signal('');

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, LoginComponent.passwordStrengthValidator]],
  });

  public get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public updateEmailErrorMessage() {
    if (this.username?.hasError('required')) {
      this.emailErrorMessage.set('Please enter a login email');
    } else if (this.username?.hasError('email')) {
      this.emailErrorMessage.set('The login email is invalid');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  public updatePasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Please enter a password';
    }
    if (this.password?.hasError('passwordStrength')) {
      return this.password.errors?.['passwordStrength'];
    }
    return '';
  }

  static passwordStrengthValidator(control: AbstractControl) {
    const { value } = control;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*)(+=._-]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && hasMinLength;

    if (!passwordValid) {
      const errors = [];
      if (!hasUpperCase) errors.push('at least one uppercase letter');
      if (!hasLowerCase) errors.push('at least one lowercase letter');
      if (!hasNumeric) errors.push('at least one number');
      if (!hasSpecial) errors.push('at least one special character');
      if (!hasMinLength) errors.push('at least 8 characters');

      return { passwordStrength: `Your password isn't strong enough. It should include: ${errors.join(', ')}` };
    }

    return null;
  }

  public login(): void {
    this.loginService.login();
    this.router.navigate(['/main']);
  }
}

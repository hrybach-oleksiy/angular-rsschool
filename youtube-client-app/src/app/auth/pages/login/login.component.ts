import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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

  public errorMessage = signal('');

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public get username() {
    return this.loginForm.get('username');
  }

  public updateErrorMessage() {
    if (this.username?.hasError('required')) {
      this.errorMessage.set('Please enter a login email');
    } else if (this.username?.hasError('email')) {
      this.errorMessage.set('The login email is invalid');
    } else {
      this.errorMessage.set('');
    }
  }

  public onLogin() {
    // this.loginService.login().subscribe(() => {
    //   this.router.navigate(['/main']);
    // });
    console.log(this.loginForm.value);
  }
}

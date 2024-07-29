import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Login } from 'src/app/types/interfaces';
import { LoginService } from '../../services/login.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, CustomButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements Login {
  public username: string = '';
  public password: string = '';

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {}

  public login(): void {
    this.loginService.login().subscribe(() => {
      this.router.navigate(['/main']);
    });
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginService } from '../../services/login.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CustomButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  public emailErrorMessage = signal('');
  // public passwordErrorMessage = signal('');

  public adminForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    imageLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, AdminComponent.dateNotInFuture]],
    tags: this.formBuilder.array([this.createTag()]),
  });

  get title() {
    return this.adminForm.get('title');
  }

  get description() {
    return this.adminForm.get('description');
  }

  get imageLink() {
    return this.adminForm.get('imageLink');
  }

  get videoLink() {
    return this.adminForm.get('videoLink');
  }

  get creationDate() {
    return this.adminForm.get('creationDate');
  }

  get tags() {
    return this.adminForm.get('tags') as FormArray;
  }

  createTag(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  resetForm() {
    this.adminForm.reset();
    this.tags.clear();
    this.tags.push(this.createTag());
  }

  // public updateEmailErrorMessage() {
  //   if (this.username?.hasError('required')) {
  //     this.emailErrorMessage.set('Please enter a login email');
  //   } else if (this.username?.hasError('email')) {
  //     this.emailErrorMessage.set('The login email is invalid');
  //   } else {
  //     this.emailErrorMessage.set('');
  //   }
  // }

  // public updatePasswordErrorMessage() {
  //   if (this.password?.hasError('required')) {
  //     return 'Please enter a password';
  //   }
  //   if (this.password?.hasError('passwordStrength')) {
  //     return this.password.errors?.['passwordStrength'];
  //   }
  //   return '';
  // }

  static dateNotInFuture(control: AbstractControl): { [key: string]: boolean } | null {
    console.log(control.value);
    const date = new Date(control.value);
    const today = new Date();
    if (date > today) {
      return { futureDate: true };
    }
    return null;
  }

  public onSubmit() {
    // this.loginService.login().subscribe(() => {
    //   this.router.navigate(['/main']);
    // });
    console.log(this.adminForm.value);
  }
}

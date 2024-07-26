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
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
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

  public tagErrorMessage = signal('');

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

  get tags(): FormArray {
    return this.adminForm.get('tags') as FormArray;
  }

  createTag(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addTag() {
    const lastTag = this.tags.at(this.tags.length - 1);
    if (lastTag && lastTag.invalid) {
      this.tagErrorMessage.set('Please fill out the current tag before adding a new one.');
    } else if (this.tags.length < 5) {
      this.tags.push(this.createTag());
      this.tagErrorMessage.set('');
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

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { SearchService } from '../../../youtube/services/search.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, FormsModule, CustomButtonComponent, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit {
  public searchForm!: FormGroup;
  private readonly searchService = inject(SearchService);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchQuery: new FormControl(''),
    });

    this.searchForm
      .get('searchQuery')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((query) => query.length >= 3),
        switchMap((query) => {
          this.searchService.setSearchQuery(query);
          return of(null);
        }),
      )
      .subscribe();
  }

  get searchQueryControl(): FormControl {
    return this.searchForm.get('searchQuery') as FormControl;
  }

  clearSearch() {
    this.searchForm.get('searchQuery')?.setValue('');
  }
}

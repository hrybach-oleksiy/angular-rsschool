import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { SearchService } from '../../../youtube/services/search.service';

import { SortType } from '../../../types/enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchInputComponent,
    MatRadioModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  showSortBlock = signal(false);
  sortCriteria = signal<SortType>(SortType.DATE);
  sortDirection = signal<SortType>(SortType.ASC);
  filterTerm = signal('');

  private readonly searchService = inject(SearchService);

  toggleSortBlock() {
    this.showSortBlock.set(!this.showSortBlock());
  }

  onSortChange() {
    this.searchService.setSortConfig({
      criteria: this.sortCriteria(),
      direction: this.sortDirection(),
    });
  }

  onFilterChange() {
    this.searchService.setFilterTerm(this.filterTerm());
  }
}

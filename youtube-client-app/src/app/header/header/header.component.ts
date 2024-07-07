import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchInputComponent, MatRadioModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showSortBlock: boolean = false;
  sortCriteria: string = 'date';
  sortDirection: string = 'asc';

  constructor(private searchService: SearchService) {}

  toggleSortBlock() {
    this.showSortBlock = !this.showSortBlock;
  }

  onSortChange() {
    this.searchService.setSortConfig({
      criteria: this.sortCriteria,
      direction: this.sortDirection,
    });
  }
}

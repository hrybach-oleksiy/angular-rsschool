import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { SearchService } from '../../../youtube/services/search.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, FormsModule, CustomButtonComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  searchQuery: string = '';

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.setSearchQuery(this.searchQuery);
  }
}

import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { SearchService } from '../../../youtube/services/search.service';
import { SortType } from '../../../types/enums';
import { LoginService } from '../../../auth/services/login.service';

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
export class HeaderComponent implements OnInit {
  showSortBlock = signal(false);
  sortCriteria = signal<SortType>(SortType.DATE);
  sortDirection = signal<SortType>(SortType.ASC);
  filterTerm = signal('');
  isHeaderVisible = signal(true);

  private readonly searchService = inject(SearchService);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHeaderVisible.set(event.url !== '/login');
      }
    });
  }

  public toggleSortBlock(): void {
    this.showSortBlock.set(!this.showSortBlock());
  }

  public onSortChange(): void {
    this.searchService.setSortConfig({
      criteria: this.sortCriteria(),
      direction: this.sortDirection(),
    });
  }

  public onFilterChange(): void {
    this.searchService.setFilterTerm(this.filterTerm());
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}

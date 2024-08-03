import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchResultsComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SearchItemData } from '../../../../types/interfaces';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { BorderColorDirective } from '../../../directives/border-color.directive';
import { itemsStats } from '../../../models/search-item.model';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CustomButtonComponent, BorderColorDirective, RouterModule],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  public item = input.required<SearchItemData>();
  public itemsStats = itemsStats;
}

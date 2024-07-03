import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SearchItemData } from '../../types/interfaces';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  @Input() item!: SearchItemData;
}

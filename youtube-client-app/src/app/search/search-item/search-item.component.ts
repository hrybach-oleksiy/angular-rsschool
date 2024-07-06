import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SearchItemData } from '../../types/interfaces';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CustomButtonComponent],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  @Input() item!: SearchItemData;
}

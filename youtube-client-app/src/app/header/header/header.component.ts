import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchInputComponent, MatRadioModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}

import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from 'src/app/shared/components/custom-button/custom-button.component';
import { CustomCard } from 'src/app/types/interfaces';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CustomButtonComponent, RouterModule],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss',
})
export class CustomCardComponent {
  @Input() card!: CustomCard | undefined;
}

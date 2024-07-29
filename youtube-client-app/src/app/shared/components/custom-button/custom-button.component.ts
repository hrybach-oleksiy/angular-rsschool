import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
  @Input() disabled: boolean = false;
}

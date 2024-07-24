import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
  standalone: true,
})
export class BorderColorDirective implements OnInit {
  @Input('appBorderColor') publishedAt!: string;

  @HostBinding('style.border-bottom') borderColor!: string;

  ngOnInit(): void {
    this.borderColor = `4px solid ${this.getColor()}`;
  }

  private getColor(): string {
    const daysDifference = this.getDaysDifference();
    if (daysDifference > 180) {
      return 'red';
    }
    if (daysDifference > 30) {
      return 'yellow';
    }
    if (daysDifference > 7) {
      return 'green';
    }
    return 'blue';
  }

  private getDaysDifference(): number {
    const currentDate = new Date().getTime();
    const publishedDate = new Date(this.publishedAt).getTime();
    return Math.floor((currentDate - publishedDate) / (1000 * 3600 * 24));
  }
}

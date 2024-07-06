import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
  standalone: true,
})
export class BorderColorDirective implements OnInit {
  @Input('appBorderColor') publishedAt!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.updateBorderColor();
  }

  private updateBorderColor() {
    const currentDate = new Date();
    const publishedDate = new Date(this.publishedAt);
    const differenceInDays = Math.floor((currentDate.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

    let borderColor: string;

    if (differenceInDays > 180) {
      borderColor = 'red';
    } else if (differenceInDays > 30) {
      borderColor = 'yellow';
    } else if (differenceInDays > 7) {
      borderColor = 'green';
    } else {
      borderColor = 'blue';
    }

    this.el.nativeElement.style.borderBottom = `4px solid ${borderColor}`;
  }
}

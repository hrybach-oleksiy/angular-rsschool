import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { SearchItemData } from '../../../types/interfaces';
import { SearchService } from '../../services/search.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, CustomButtonComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailComponent implements OnInit {
  public video: SearchItemData | undefined;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.searchService.getItemById(id);
          }
          return [undefined];
        }),
      )
      .subscribe((video) => {
        this.video = video;
      });
  }

  goBack(): void {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { SearchItemData } from '../../../types/interfaces';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
})
export class VideoDetailComponent implements OnInit {
  public video: SearchItemData | undefined;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
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
}

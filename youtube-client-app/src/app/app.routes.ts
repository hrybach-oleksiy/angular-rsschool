import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { MainComponent } from './youtube/pages/main/main.component';
import { authGuard } from './auth/guards/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { VideoDetailComponent } from './youtube/pages/video-detail/video-detail.component';
// import { SearchResultsComponent } from './youtube/components/search/search-results/search-results.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
  { path: 'video/:id', component: VideoDetailComponent, canActivate: [authGuard] },
  // {
  //   path: 'main',
  //   component: MainComponent,
  //   canActivate: [authGuard],
  //   children: [
  //     { path: '', component: SearchResultsComponent },
  //     { path: 'video/:id', component: VideoDetailComponent },
  //   ],
  // },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

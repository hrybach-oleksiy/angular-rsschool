import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { MainComponent } from './youtube/pages/main/main.component';
import { AdminComponent } from './auth/pages/admin/admin.component';
import { authGuard } from './auth/guards/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { VideoDetailComponent } from './youtube/pages/video-detail/video-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
  },
  {
    path: 'video/:id',
    component: VideoDetailComponent,
    canActivate: [authGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: '**', component: NotFoundComponent },
];

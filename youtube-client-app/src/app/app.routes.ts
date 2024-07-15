import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { MainComponent } from './youtube/pages/main/main.component';
import { authGuard } from './auth/guards/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

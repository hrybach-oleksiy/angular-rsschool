import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly TOKEN_KEY = 'auth_token';

  public login(): Observable<boolean> {
    localStorage.setItem(this.TOKEN_KEY, 'user-token');
    return of(true);
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}

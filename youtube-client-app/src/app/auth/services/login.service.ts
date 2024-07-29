import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly TOKEN_KEY = 'auth_token';

  public login(): void {
    localStorage.setItem(this.TOKEN_KEY, 'user-token');
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}

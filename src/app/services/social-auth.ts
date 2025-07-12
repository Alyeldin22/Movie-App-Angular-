import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './auth';

export interface SocialUser {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  provider: 'google' | 'facebook';
}

@Injectable({ providedIn: 'root' })
export class SocialAuthService {
  private socialUserSubject = new BehaviorSubject<SocialUser | null>(null);
  socialUser$ = this.socialUserSubject.asObservable();

  async loginWithGoogle(): Promise<SocialUser | null> {
    return new Promise((resolve) => {
      // Simulate Google login
      setTimeout(() => {
        const mockUser: SocialUser = {
          id: 'google_' + Date.now(),
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          photoUrl: 'https://via.placeholder.com/40',
          provider: 'google'
        };
        this.socialUserSubject.next(mockUser);
        resolve(mockUser);
      }, 1500);
    });
  }

  async loginWithFacebook(): Promise<SocialUser | null> {
    return new Promise((resolve) => {
      // Simulate Facebook login
      setTimeout(() => {
        const mockUser: SocialUser = {
          id: 'facebook_' + Date.now(),
          name: 'Jane Smith',
          email: 'jane.smith@facebook.com',
          photoUrl: 'https://via.placeholder.com/40',
          provider: 'facebook'
        };
        this.socialUserSubject.next(mockUser);
        resolve(mockUser);
      }, 1500);
    });
  }

  logout(): void {
    this.socialUserSubject.next(null);
  }

  getCurrentSocialUser(): SocialUser | null {
    return this.socialUserSubject.value;
  }

  isSocialLoggedIn(): boolean {
    return this.socialUserSubject.value !== null;
  }
} 
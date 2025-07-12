import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Add password field
  photoUrl?: string;
  provider?: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  provider?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<SessionUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Simple password hashing function (in production, use bcrypt or similar)
  private hashPassword(password: string): string {
    // This is a simple hash for demo purposes
    // In a real application, use a proper hashing library
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  // Verify password against stored hash
  private verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  async register(credentials: RegisterCredentials): Promise<boolean> {
    try {
      // Check if user already exists
      const existingUsers = this.getUsersFromStorage();
      const existingUser = existingUsers.find(user => user.email === credentials.email);
      
      if (existingUser) {
        console.error('User already exists');
        return false;
      }

      // Create new user with hashed password
      const newUser: User = {
        id: this.generateId(),
        name: credentials.name,
        email: credentials.email,
        password: this.hashPassword(credentials.password), // Store hashed password
        provider: 'email'
      };

      // Save user to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Auto-login after registration (don't store password in currentUser)
      const userForSession: SessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        photoUrl: newUser.photoUrl,
        provider: newUser.provider
      };
      this.currentUserSubject.next(userForSession);
      localStorage.setItem('currentUser', JSON.stringify(userForSession));
      
      console.log('User registered successfully:', userForSession);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      // Get users from localStorage
      const users = this.getUsersFromStorage();
      const user = users.find(u => u.email === credentials.email);
      
      if (!user) {
        console.error('User not found');
        return false;
      }

      // Verify password
      if (!this.verifyPassword(credentials.password, user.password)) {
        console.error('Invalid password');
        return false;
      }

      // Set current user (don't include password in session)
      const userForSession: SessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        provider: user.provider
      };
      this.currentUserSubject.next(userForSession);
      localStorage.setItem('currentUser', JSON.stringify(userForSession));
      
      console.log('User logged in successfully:', userForSession);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async loginWithGoogle(): Promise<boolean> {
    try {
      // Simulate Google login
      const mockUser: User = {
        id: this.generateId(),
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '', // No password for social login
        photoUrl: 'https://via.placeholder.com/150',
        provider: 'google'
      };

      // Save user to localStorage if not exists
      const users = this.getUsersFromStorage();
      const existingUser = users.find(u => u.email === mockUser.email);
      
      if (!existingUser) {
        users.push(mockUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Set current user
      const userForSession: SessionUser = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        photoUrl: mockUser.photoUrl,
        provider: mockUser.provider
      };
      this.currentUserSubject.next(userForSession);
      localStorage.setItem('currentUser', JSON.stringify(userForSession));
      
      console.log('Google login successful:', userForSession);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  }

  async loginWithFacebook(): Promise<boolean> {
    try {
      // Simulate Facebook login
      const mockUser: User = {
        id: this.generateId(),
        name: 'Jane Smith',
        email: 'jane.smith@facebook.com',
        password: '', // No password for social login
        photoUrl: 'https://via.placeholder.com/150',
        provider: 'facebook'
      };

      // Save user to localStorage if not exists
      const users = this.getUsersFromStorage();
      const existingUser = users.find(u => u.email === mockUser.email);
      
      if (!existingUser) {
        users.push(mockUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Set current user
      const userForSession: SessionUser = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        photoUrl: mockUser.photoUrl,
        provider: mockUser.provider
      };
      this.currentUserSubject.next(userForSession);
      localStorage.setItem('currentUser', JSON.stringify(userForSession));
      
      console.log('Facebook login successful:', userForSession);
      return true;
    } catch (error) {
      console.error('Facebook login error:', error);
      return false;
    }
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  }

  getCurrentUser(): SessionUser | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Helper methods for localStorage
  private getUsersFromStorage(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Method to check if email exists (for registration validation)
  isEmailRegistered(email: string): boolean {
    const users = this.getUsersFromStorage();
    return users.some(user => user.email === email);
  }

  // Method to verify login credentials
  verifyCredentials(email: string, password: string): boolean {
    const users = this.getUsersFromStorage();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return false;
    }

    return this.verifyPassword(password, user.password);
  }

  // Method to get all registered users (for debugging)
  getAllUsers(): User[] {
    return this.getUsersFromStorage();
  }
} 
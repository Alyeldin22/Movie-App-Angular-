import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../services/language';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    PasswordModule, 
    ButtonModule,
    CardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };
  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private languageService: LanguageService
  ) {}

  async onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.toastr.error(this.translate('error.fillAllFields'), 'Error');
      return;
    }

    this.isLoading = true;

    try {
      // First check if user exists
      if (!this.authService.isEmailRegistered(this.credentials.email)) {
        this.toastr.error(this.translate('error.userNotFound'), 'Login Failed');
        window.alert(this.translate('error.userNotFound'));
        this.isLoading = false;
        return;
      }

      // Then verify credentials
      if (!this.authService.verifyCredentials(this.credentials.email, this.credentials.password)) {
        this.toastr.error(this.translate('error.invalidPassword'), 'Login Failed');
        window.alert(this.translate('error.invalidPassword'));
        this.isLoading = false;
        return;
      }

      // If credentials are valid, proceed with login
      const success = await this.authService.login(this.credentials);
      if (success) {
        this.toastr.success(this.translate('success.login'), this.translate('nav.welcome'));
        this.router.navigate(['/movies']);
      } else {
        this.toastr.error(this.translate('error.loginFailed'), 'Login Failed');
      }
    } catch (error) {
      this.toastr.error(this.translate('error.general'), 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 
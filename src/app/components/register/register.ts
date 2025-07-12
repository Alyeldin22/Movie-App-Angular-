import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterCredentials } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../services/language';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    PasswordModule, 
    ButtonModule,
    CardModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  credentials: RegisterCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private languageService: LanguageService
  ) {}

  async onSubmit() {
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password || !this.credentials.confirmPassword) {
      this.toastr.error(this.translate('error.fillAllFields'), 'Error');
      return;
    }

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.toastr.error(this.translate('error.passwordsNotMatch'), 'Error');
      return;
    }

    if (this.credentials.password.length < 6) {
      this.toastr.error(this.translate('error.passwordLength'), 'Error');
      return;
    }

    // Check if email is already registered
    if (this.authService.isEmailRegistered(this.credentials.email)) {
      this.toastr.error('This email is already registered. Please use a different email or login.', 'Error');
      return;
    }

    this.isLoading = true;

    try {
      const success = await this.authService.register(this.credentials);
      if (success) {
        this.toastr.success(this.translate('success.registration'), this.translate('nav.welcome'));
        this.router.navigate(['/movies']);
      } else {
        this.toastr.error(this.translate('error.registrationFailed'), 'Error');
      }
    } catch (error) {
      this.toastr.error(this.translate('error.general'), 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Translation helper method
  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 
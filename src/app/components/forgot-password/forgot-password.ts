import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../services/language';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    ButtonModule,
    CardModule
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading = false;
  emailSent = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private languageService: LanguageService
  ) {}

  async onSubmit() {
    if (!this.email) {
      this.toastr.error(this.translate('error.fillAllFields'), 'Error');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.toastr.error(this.translate('error.validEmail'), 'Error');
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.emailSent = true;
      this.toastr.success(this.translate('success.emailSent'), this.translate('msg.checkEmail'));
    }, 2000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  resetForm() {
    this.email = '';
    this.emailSent = false;
  }

  // Translation helper method
  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 
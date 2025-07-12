import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { LanguageService } from '../../services/language';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, InputTextModule, ButtonModule]
})
export class NavbarComponent {
  searchQuery: string = '';
  selectedLang: string = 'en';
  wishlistCount: number = 0;
  currentUser$;

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private languageService: LanguageService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistCount = items.length;
    });

    this.languageService.lang$.subscribe(lang => {
      this.selectedLang = lang;
    });
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery }
      });
    }
  }

  changeLang(event: any) {
    const lang = event.target.value;
    this.languageService.setLang(lang);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Translation helper method
  translate(key: string): string {
    return this.languageService.translate(key);
  }
}

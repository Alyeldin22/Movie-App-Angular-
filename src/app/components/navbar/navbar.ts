import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { LanguageService } from '../../services/language';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class NavbarComponent {
  searchQuery: string = '';
  selectedLang: string = 'en';
  wishlistCount: number = 0;

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private languageService: LanguageService
  ) {}

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
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}

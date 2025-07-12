import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvService } from '../../services/tv';
import { WishlistService } from '../../services/wishlist';
import { LanguageService } from '../../services/language';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.html',
  styleUrls: ['./tv-shows.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule]
})
export class TvShowsComponent implements OnInit {
  tvShows: any[] = [];
  currentPage = 1;
  totalPages = 0;
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private tvService: TvService,
    private wishlistService: WishlistService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.fetchTvShows();
  }

  fetchTvShows(): void {
    this.tvService.getPopularTvShows(this.currentPage).subscribe((res: any) => {
      this.tvShows = res.results;
      this.totalPages = res.total_pages;
    });
  }

  toggleWishlist(show: any) {
    if (this.wishlistService.isInWishlist(show.id)) {
      this.wishlistService.removeFromWishlist(show.id);
    } else {
      this.wishlistService.addToWishlist(show, 'tv');
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchTvShows();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTvShows();
    }
  }

  isInWishlist(showId: number) {
    return this.wishlistService.isInWishlist(showId);
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FF9800';
    return '#F44336';
  }

  // Translation helper method
  translate(key: string): string {
    return this.languageService.translate(key);
  }
}

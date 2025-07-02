import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService, WishlistItem } from '../../services/wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  movies: WishlistItem[] = [];
  tvShows: WishlistItem[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
      this.movies = items.filter(item => item.type === 'movie');
      this.tvShows = items.filter(item => item.type === 'tv');
    });
  }

  removeFromWishlist(item: WishlistItem) {
    this.wishlistService.removeFromWishlist(item.id);
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FF9800';
    return '#F44336';
  }

  getReleaseDate(item: WishlistItem): string {
    return item.release_date || item.first_air_date || 'N/A';
  }
}

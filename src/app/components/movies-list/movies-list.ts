import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { WishlistService } from '../../services/wishlist';
import { LanguageService } from '../../services/language';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.html',
  styleUrls: ['./movies-list.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule]
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  totalPages = 0;
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private movieService: MovieService,
    private wishlistService: WishlistService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getNowPlayingMovies(this.currentPage).subscribe((res: any) => {
      this.movies = res.results;
      this.totalPages = res.total_pages;
    });
  }

  toggleWishlist(movie: any) {
    if (this.wishlistService.isInWishlist(movie.id)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie, 'movie');
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }

  isInWishlist(movieId: number) {
    return this.wishlistService.isInWishlist(movieId);
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

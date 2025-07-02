import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { WishlistService } from '../../services/wishlist';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.html',
  styleUrls: ['./movies-list.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  totalPages = 0;
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private movieService: MovieService,
    private wishlistService: WishlistService
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
      this.wishlistService.addToWishlist(movie);
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
}

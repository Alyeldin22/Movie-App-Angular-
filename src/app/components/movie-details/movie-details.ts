import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  recommendations: any[] = [];
  reviews: any[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';
  backdropBase = 'https://image.tmdb.org/t/p/original';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadMovieDetails(id);
      this.loadRecommendations(id);
      this.loadReviews(id);
    });
  }

  loadMovieDetails(id: number): void {
    this.movieService.getMovieDetails(id).subscribe((movie: any) => {
      this.movie = movie;
    });
  }

  loadRecommendations(id: number): void {
    this.movieService.getRecommendations(id).subscribe((res: any) => {
      this.recommendations = res.results.slice(0, 6);
    });
  }

  loadReviews(id: number): void {
    this.movieService.getReviews(id).subscribe((res: any) => {
      this.reviews = res.results.slice(0, 3);
    });
  }

  toggleWishlist(movie: any) {
    if (this.wishlistService.isInWishlist(movie.id)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie, 'movie');
    }
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistService.isInWishlist(movieId);
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FF9800';
    return '#F44336';
  }
}


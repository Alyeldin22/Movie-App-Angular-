import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  recommendations: any[] = [];
  reviews: any[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadDetails(id);
  }

  loadDetails(id: number) {
    this.movieService.getMovieDetails(id).subscribe(data => {
      this.movie = data;
    });

    this.movieService.getRecommendations(id).subscribe(data => {
      this.recommendations = data.results;
    });

    this.movieService.getReviews(id).subscribe(data => {
      this.reviews = data.results;
    });
  }

  toggleWishlist(movie: any) {
    if (this.isInWishlist(movie.id)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie);
    }
  }

  isInWishlist(id: number) {
    return this.wishlistService.isInWishlist(id);
  }
}

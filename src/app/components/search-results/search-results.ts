import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.searchMovies();
      }
    });
  }

  searchMovies(): void {
    this.loading = true;
    this.movieService.searchMovies(this.searchQuery).subscribe((res: any) => {
      this.searchResults = res.results;
      this.loading = false;
    }, error => {
      console.error('Search error:', error);
      this.loading = false;
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

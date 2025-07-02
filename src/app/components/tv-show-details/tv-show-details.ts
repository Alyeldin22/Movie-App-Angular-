import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TvService } from '../../services/tv';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.html',
  styleUrls: ['./tv-show-details.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any = null;
  recommendations: any[] = [];
  reviews: any[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';
  backdropBase = 'https://image.tmdb.org/t/p/original';

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadTvShowDetails(id);
      this.loadRecommendations(id);
      this.loadReviews(id);
    });
  }

  loadTvShowDetails(id: number): void {
    this.tvService.getTvShowDetails(id).subscribe((show: any) => {
      this.tvShow = show;
    });
  }

  loadRecommendations(id: number): void {
    this.tvService.getTvShowRecommendations(id).subscribe((res: any) => {
      this.recommendations = res.results.slice(0, 6);
    });
  }

  loadReviews(id: number): void {
    this.tvService.getTvShowReviews(id).subscribe((res: any) => {
      this.reviews = res.results.slice(0, 3);
    });
  }

  toggleWishlist(show: any) {
    if (this.wishlistService.isInWishlist(show.id)) {
      this.wishlistService.removeFromWishlist(show.id);
    } else {
      this.wishlistService.addToWishlist(show, 'tv');
    }
  }

  isInWishlist(showId: number): boolean {
    return this.wishlistService.isInWishlist(showId);
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FF9800';
    return '#F44336';
  }
}

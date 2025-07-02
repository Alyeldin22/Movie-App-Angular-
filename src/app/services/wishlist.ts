import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WishlistItem {
  id: number;
  title: string;
  poster_path: string;
  type: 'movie' | 'tv';
  overview?: string;
  release_date?: string;
  first_air_date?: string;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist = new BehaviorSubject<WishlistItem[]>([]);
  wishlist$ = this.wishlist.asObservable();

  addToWishlist(item: any, type: 'movie' | 'tv') {
    const current = this.wishlist.value;
    const wishlistItem: WishlistItem = {
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      type: type,
      overview: item.overview,
      release_date: item.release_date,
      first_air_date: item.first_air_date
    };
    
    if (!this.isInWishlist(item.id)) {
      this.wishlist.next([...current, wishlistItem]);
    }
  }

  removeFromWishlist(id: number) {
    const updated = this.wishlist.value.filter(item => item.id !== id);
    this.wishlist.next(updated);
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.value.some(item => item.id === id);
  }

  getWishlist() {
    return this.wishlist.value;
  }

  getWishlistByType(type: 'movie' | 'tv') {
    return this.wishlist.value.filter(item => item.type === type);
  }
}

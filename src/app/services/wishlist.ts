import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieService } from './movie';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlist.asObservable();

  addToWishlist(item: any) {
    const current = this.wishlist.value;
    this.wishlist.next([...current, item]);
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
}

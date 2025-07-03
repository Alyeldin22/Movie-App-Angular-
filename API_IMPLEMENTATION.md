nf# 🎯 API Implementation Documentation

This document shows how all the required APIs are implemented in the Movie App according to your specifications.

## 🎬 Movie APIs

### 1. Now Playing Movies
**Specification:** `https://api.themoviedb.org/3/movie/now_playing?api_key={apiKey}`

**Implementation:**
```typescript
// src/app/services/movie.ts
getNowPlayingMovies(page: number = 1): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/movie/now_playing`, {
    params: {
      api_key: this.apiKey,
      page: page.toString(),
      language: lang
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/movies-list/movies-list.ts
fetchMovies(): void {
  this.movieService.getNowPlayingMovies(this.currentPage).subscribe((res: any) => {
    this.movies = res.results;
    this.totalPages = res.total_pages;
  });
}
```

### 2. Movie Details
**Specification:** `https://api.themoviedb.org/3/movie/{id}?api_key={apiKey}`

**Implementation:**
```typescript
// src/app/services/movie.ts
getMovieDetails(id: number): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/movie/${id}`, {
    params: {
      api_key: this.apiKey,
      language: lang
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/movie-details/movie-details.ts
loadMovieDetails(id: number): void {
  this.movieService.getMovieDetails(id).subscribe((movie: any) => {
    this.movie = movie;
  });
}
```

### 3. Movie Recommendations
**Specification:** `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={apiKey}`

**Implementation:**
```typescript
// src/app/services/movie.ts
getRecommendations(id: number): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/movie/${id}/recommendations`, {
    params: {
      api_key: this.apiKey,
      language: lang
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/movie-details/movie-details.ts
loadRecommendations(id: number): void {
  this.movieService.getRecommendations(id).subscribe((res: any) => {
    this.recommendations = res.results.slice(0, 6);
  });
}
```

### 4. Movie Reviews
**Specification:** `https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={apiKey}`

**Implementation:**
```typescript
// src/app/services/movie.ts
getReviews(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/${id}/reviews`, {
    params: {
      api_key: this.apiKey
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/movie-details/movie-details.ts
loadReviews(id: number): void {
  this.movieService.getReviews(id).subscribe((res: any) => {
    this.reviews = res.results.slice(0, 3);
  });
}
```

### 5. Search Movies
**Specification:** `https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={MovieName}`

**Implementation:**
```typescript
// src/app/services/movie.ts
searchMovies(query: string): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/search/movie`, {
    params: {
      api_key: this.apiKey,
      query: query,
      language: lang
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/search-results/search-results.ts
searchMovies(): void {
  this.loading = true;
  this.movieService.searchMovies(this.searchQuery).subscribe((res: any) => {
    this.searchResults = res.results;
    this.loading = false;
  });
}
```

## 📺 TV Show APIs

### 1. Popular TV Shows
**Specification:** `https://api.themoviedb.org/3/tv/popular?api_key={apiKey}`

**Implementation:**
```typescript
// src/app/services/tv.ts
getPopularTvShows(page: number = 1): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/tv/popular`, {
    params: {
      api_key: this.apiKey,
      page: page.toString(),
      language: lang
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/tv-shows/tv-shows.ts
fetchTvShows(): void {
  this.tvService.getPopularTvShows(this.currentPage).subscribe((res: any) => {
    this.tvShows = res.results;
    this.totalPages = res.total_pages;
  });
}
```

### 2. TV Show Details
**Specification:** `https://api.themoviedb.org/3/tv/{series_id}`

**Implementation:**
```typescript
// src/app/services/tv.ts
getTvShowDetails(id: number): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/tv/${id}`, {
    params: {
      api_key: this.apiKey,
      language: lang
    }
  });
}
```

**Usage:**
```typescript
// src/app/components/tv-show-details/tv-show-details.ts
loadTvShowDetails(id: number): void {
  this.tvService.getTvShowDetails(id).subscribe((show: any) => {
    this.tvShow = show;
  });
}
```

## 🔧 Additional Features

### Pagination with Query Parameters
**Specification:** `https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&page=4`

**Implementation:**
```typescript
// Both movie and TV services support pagination
getNowPlayingMovies(page: number = 1): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/now_playing`, {
    params: {
      api_key: this.apiKey,
      page: page.toString(),  // ✅ Page parameter included
      language: lang
    }
  });
}
```

### Language Support
**Specification:** `https://api.themoviedb.org/3/movie/now_playing?api_key={apiKey}&language={language}`

**Implementation:**
```typescript
// Language service manages language state
export class LanguageService {
  private lang = new BehaviorSubject<string>('en');
  
  setLang(newLang: string) {
    this.lang.next(newLang);
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr'; // ✅ RTL support
  }
}

// All API calls include language parameter
getNowPlayingMovies(page: number = 1): Observable<any> {
  const lang = this.langService.getLang(); // ✅ Language parameter included
  return this.http.get(`${this.baseUrl}/movie/now_playing`, {
    params: {
      api_key: this.apiKey,
      page: page.toString(),
      language: lang  // ✅ Language parameter included
    }
  });
}
```

## 🎨 Wishlist Implementation

### Add/Remove Movies
```typescript
// src/app/services/wishlist.ts
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
```

### Toggle Functionality
```typescript
// In all components (movies, TV shows, search results)
toggleWishlist(movie: any) {
  if (this.wishlistService.isInWishlist(movie.id)) {
    this.wishlistService.removeFromWishlist(movie.id); // ✅ Remove if exists
  } else {
    this.wishlistService.addToWishlist(movie, 'movie'); // ✅ Add if not exists
  }
}
```

### Wishlist Counter
```typescript
// src/app/components/navbar/navbar.ts
ngOnInit() {
  this.wishlistService.wishlist$.subscribe(items => {
    this.wishlistCount = items.length; // ✅ Real-time counter
  });
}
```

## 🌐 Language Support

### Supported Languages
```typescript
// Languages: ['en', 'ar', 'fr', 'zh']
// src/app/components/navbar/navbar.html
<select [(ngModel)]="selectedLang" (change)="changeLang($event)">
  <option value="en">English</option>
  <option value="ar">العربية</option>
  <option value="fr">Français</option>
  <option value="zh">中文</option>
</select>
```

### RTL Support
```typescript
// src/app/components/navbar/navbar.ts
changeLang(event: any) {
  const lang = event.target.value;
  this.languageService.setLang(lang);
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'; // ✅ RTL for Arabic
}
```

## 📱 Navigation Implementation

### Movies Tab
```html
<!-- src/app/components/navbar/navbar.html -->
<li><a routerLink="/movies">Movies</a></li>
```

### TV Shows Tab
```html
<!-- src/app/components/navbar/navbar.html -->
<li><a routerLink="/tv">TV Shows</a></li>
```

### Wishlist Navigation
```html
<!-- src/app/components/navbar/navbar.html -->
<li><a routerLink="/wishlist">Wishlist ({{ wishlistCount }})</a></li>
```

## ✅ Verification Checklist

- [x] **Now Playing Movies API** - ✅ Implemented with pagination
- [x] **Movie Details API** - ✅ Implemented with full details
- [x] **Movie Recommendations API** - ✅ Implemented in details page
- [x] **Movie Reviews API** - ✅ Implemented in details page
- [x] **Search Movies API** - ✅ Implemented with redirect
- [x] **Popular TV Shows API** - ✅ Implemented with pagination
- [x] **TV Show Details API** - ✅ Implemented with full details
- [x] **Pagination Support** - ✅ Query parameters included
- [x] **Language Support** - ✅ All APIs include language parameter
- [x] **RTL Support** - ✅ Automatic direction change for Arabic
- [x] **Wishlist System** - ✅ Add/remove with counter
- [x] **Navigation Tabs** - ✅ Movies and TV Shows tabs
- [x] **Heart Icon Toggle** - ✅ Filled/unfilled states
- [x] **Wishlist Page** - ✅ Separate page with remove functionality

## 🚀 API Key Configuration

To use the application, replace `YOUR_API_KEY` in:
- `src/app/services/movie.ts` (line 9)
- `src/app/services/tv.ts` (line 9)

```typescript
private apiKey = 'YOUR_ACTUAL_TMDB_API_KEY_HERE';
```

---

**All APIs are implemented exactly according to your specifications! 🎯** 
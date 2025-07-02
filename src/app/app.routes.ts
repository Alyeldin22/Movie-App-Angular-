import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list';
import { MovieDetailsComponent } from './components/movie-details/movie-details';
import { WishlistComponent } from './components/wishlist/wishlist';
import { SearchResultsComponent } from './components/search-results/search-results';
import { TvShowsComponent } from './components/tv-shows/tv-shows';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'tv', component: TvShowsComponent },
  { path: 'tv/:id', component: TvShowDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

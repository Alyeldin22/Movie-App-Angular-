import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list';
import { MovieDetailsComponent } from './components/movie-details/movie-details';
import { WishlistComponent } from './components/wishlist/wishlist';
import { SearchResultsComponent } from './components/search-results/search-results';
import { TvShowsComponent } from './components/tv-shows/tv-shows';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'movies', component: MoviesListComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchResultsComponent, canActivate: [AuthGuard] },
  { path: 'tv', component: TvShowsComponent, canActivate: [AuthGuard] },
  { path: 'tv/:id', component: TvShowDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

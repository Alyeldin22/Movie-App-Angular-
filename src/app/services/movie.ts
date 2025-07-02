import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language'; 
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'YOUR_API_KEY'; // 🔁 Replace with your actual TMDb API Key
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient, private langService: LanguageService) {}

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
  getMovieDetails(id: number): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/movie/${id}`, {
    params: {
      api_key: this.apiKey,
      language: lang
    }
  });
}

getRecommendations(id: number): Observable<any> {
  const lang = this.langService.getLang();
  return this.http.get(`${this.baseUrl}/movie/${id}/recommendations`, {
    params: {
      api_key: this.apiKey,
      language: lang
    }
  });
}

getReviews(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/${id}/reviews`, {
    params: {
      api_key: this.apiKey
    }
  });
}

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

}

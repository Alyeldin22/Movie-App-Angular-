import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language'; 
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TvService {
  private apiKey = 'c0c5c115d1696f7cc01f063389997127';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient, private langService: LanguageService) {}

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

  getTvShowDetails(id: number): Observable<any> {
    const lang = this.langService.getLang();
    return this.http.get(`${this.baseUrl}/tv/${id}`, {
      params: {
        api_key: this.apiKey,
        language: lang
      }
    });
  }

  getTvShowRecommendations(id: number): Observable<any> {
    const lang = this.langService.getLang();
    return this.http.get(`${this.baseUrl}/tv/${id}/recommendations`, {
      params: {
        api_key: this.apiKey,
        language: lang
      }
    });
  }

  getTvShowReviews(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${id}/reviews`, {
      params: {
        api_key: this.apiKey
      }
    });
  }
}

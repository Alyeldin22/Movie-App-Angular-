import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private lang = new BehaviorSubject<string>('en');
  lang$ = this.lang.asObservable();

  setLang(newLang: string) {
    this.lang.next(newLang);
  }

  getLang(): string {
    return this.lang.value;
  }
}


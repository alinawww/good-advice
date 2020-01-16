import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // https://api.adviceslip.com

  constructor(private http: HttpClient) { }

  public getRandomAdvice() {
    return this.http.get('https://api.adviceslip.com/advice');
  }
}

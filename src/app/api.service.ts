import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // https://api.adviceslip.com

  constructor(private http: HttpClient) { }

  public getRandomAdvice() {
    return this.http.get('https://api.adviceslip.com/advice');
  }

  public getNfCountries() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
      'x-rapidapi-key': 'r4BejcOwkgmsh3ERo0mcp7yxrqVpp1pozcmjsnfJWwpgcFUfd0'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    // return this.http.get('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=lc&q=available', requestOptions);
    // src/app/mock-data/countries.json
    return this.http.get('/assets/mock/countries.json');
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
  'x-rapidapi-key': 'r4BejcOwkgmsh3ERo0mcp7yxrqVpp1pozcmjsnfJWwpgcFUfd0'
};

const headerDict2 = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  "x-rapidapi-host": "unogsng.p.rapidapi.com",
  "x-rapidapi-key": "r4BejcOwkgmsh3ERo0mcp7yxrqVpp1pozcmjsnfJWwpgcFUfd0"
};

const requestOptions2 = {
  headers: new HttpHeaders(headerDict2),
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  public getRandomAdvice() {
    return this.http.get('https://api.adviceslip.com/advice');
  }

  public getNfCountries() {
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    // return this.http.get('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=lc&q=available', requestOptions);
    // src/app/mock-data/countries.json
    return this.http.get('/assets/mock/countries.json');
  }

  searchNf(queryObj): Observable<any> {
    // const classicCommedy = 31694;
    // const actionc = 43040;
    // const screwb = 9702;
    // const political = 2700;
    // const dark = 869;
    // const goofy = 6197;
    console.log('queryObj', queryObj);
    // const url = `https://unogsng.p.rapidapi.com/search?genrelist=31694,43040,9702,2700,869,6197&type=movie&orderby=rating&countrylist=67&audio=english`;

    const url = `https://unogsng.p.rapidapi.com/search`;
    return this.http.get(url, {...requestOptions2, params: {...queryObj}});
    // return this.http.get('/assets/mock/films.json');
  }

  getGenres(): Observable<any> {
    const url = 'https://unogsng.p.rapidapi.com/genres';
    return this.http.get(url, requestOptions2);
  }

}

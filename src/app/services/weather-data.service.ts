import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CurrentData } from '../data/data-structures';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Something bad happened; please try again later.');
  };

  getData(city: string): Observable<CurrentData> {
    return this.http.get<CurrentData>('https://api.openweathermap.org/data/2.5/weather?q='+ city +',es&APPID=a0e4c300d1bd0d77dfe82a3b1a2c8ba9&units=metric&lang=es')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getFutureData(lat: number, lon: number) {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&exclude=current,minutely&appid=a0e4c300d1bd0d77dfe82a3b1a2c8ba9&units=metric&lang=es').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
}

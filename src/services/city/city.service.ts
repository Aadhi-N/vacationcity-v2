import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from } from 'rxjs';
import { catchError, tap, first } from "rxjs/operators";


import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { forkJoin } from "rxjs";
import { City } from "./city";
import { CityTemp } from "../city-temp/cityTemp";
import { CityCoord } from "../city-coord/cityCoord";

import { environment } from "../../environments/environment"



@Injectable({
  providedIn: 'root'
})
export class CityService {
  // private citiesUrl = "http://localhost:8000/api/cities";
  // private cityTempsUrl = "http://localhost:8000/api/citytemps";
  // private cityCoordsUrl = "http://localhost:8000/api/citycoords";

  // private citiesUrl = "api/cities";
  // private cityTempsUrl = "api/cityTemps";
  // private cityCoordsUrl = "api/cityCoords";
  private citiesUrl = `${environment.apiUrl}/cities`;
  private cityTempsUrl = `${environment.apiUrl}/citytemps`;
  private cityCoordsUrl = `${environment.apiUrl}/citycoords`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`CityService: ${message}`);
  }
  
  
  getCities(): Observable<any[]> {
    /* GET requests to 3 different apis, forkJoin together to merge city_temp + city_cords to City object */
    let cityData = this.http.get(this.citiesUrl);
    let cityTempData = this.http.get(this.cityTempsUrl);
    let cityCoordData = this.http.get(this.cityCoordsUrl);
      return forkJoin([cityData, cityTempData, cityCoordData])
      .pipe(
          tap(cities => {this.log("fetched cities"), console.log('SERVICE', cities)}),
          catchError(this.handleError("getCities", [])     
          )
      );
  };


  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
};

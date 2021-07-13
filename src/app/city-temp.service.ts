import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { CityTemp } from "./cityTemp";

import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CityTempService {
  // private cityTempsUrl = "api/cityTemps";
  // private cityTempsUrl = "http://localhost:8000/api/citytemps";
  private cityTempsUrl = `${environment.apiUrl}/cityTemps`;


  constructor(private http: HttpClient,
    private messageService: MessageService
    ) { }

  private log(message: string) {
    this.messageService.add(`CityTempService: ${message}`);
  }

  getCityTemps(): Observable<CityTemp[]> {
    return this.http
      .get<CityTemp[]>(this.cityTempsUrl)
      .pipe(
        tap(cityTemps => this.log("fetched city temps")),
        catchError(this.handleError("getCityTemps", []))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

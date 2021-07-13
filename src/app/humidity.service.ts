import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { Humidity } from "./humidity";

import { environment } from "../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class HumidityService {
  // private humidityUrl = "api/humidity";
  // private humidityUrl = "http://localhost:8000/api/humidity";
  private humidityUrl = `${environment.apiUrl}/humidity`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HumidityService: ${message}`);
  }

  getHumidity(): Observable<Humidity[]> {
    return this.http
      .get<Humidity[]>(this.humidityUrl)
      .pipe(
        tap(humidity => this.log("fetched humidity")),
        catchError(this.handleError("getHumidity", []))
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

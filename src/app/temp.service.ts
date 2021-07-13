import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { Temp } from "./temp";

import { environment } from "../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class TempService {
  // private tempsUrl = "api/temps";
  // private tempsUrl = "http://localhost:8000/api/temps";
  private tempsUrl = `${environment.apiUrl}/temps`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`TempService: ${message}`);
  }

  getTemps(): Observable<Temp[]> {
    return this.http.get<Temp[]>(this.tempsUrl)
      .pipe(
        tap(temps=> this.log("fetched temps")),
        catchError(this.handleError("getTemps", []))
      )
  };

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };
}

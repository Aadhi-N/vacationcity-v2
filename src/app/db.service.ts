import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";

import { HerokuDatabase } from "./db"; 

@Injectable({
  providedIn: 'root'
})
export class HerokuDatabaseService {
  private dbUrl = "/api/db";

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HerokuDatabaseService: ${message}`);
  }

  getHerokuData(): Observable<HerokuDatabase[]>{
    return this.http
      .get<HerokuDatabase[]>(this.dbUrl)
      .pipe(
        tap(herokuData => {this.log("fetched herokuData")}),
        catchError(this.handleError("getHerokuData", []))
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

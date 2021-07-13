import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { Month } from "./month";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MonthService {
  // private monthsUrl = "api/months";
  // private monthsUrl = "https://vacationcity.herokuapp.com/api/months";
  private monthsUrl = `${environment.apiUrl}/months`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`MonthService: ${message}`);
  }

  getMonths(): Observable<Month[]> {
    return this.http
      .get<Month[]>(this.monthsUrl)
      .pipe(
        tap(months => this.log("fetched months")),
        catchError(this.handleError("getMonths", []))
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
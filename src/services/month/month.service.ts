import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { Month } from "./month";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MonthService {
  private monthsUrl = `${environment.apiUrl}/months`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`MonthService: ${message}`);
  }

  /* GET request for list of months */
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
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
};
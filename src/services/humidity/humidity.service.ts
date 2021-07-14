import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

import { MessageService } from "../message/message.service";
import { Observable, of } from "rxjs";
import { Humidity } from "./humidity";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HumidityService {
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
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
};

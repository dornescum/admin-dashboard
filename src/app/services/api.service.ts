import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import { environment } from '../../enviroments/environment';
import { statusMessages } from '../models/clientMessages';

const headers = {
  'Access-Control-Allow-Origin': '*'
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllData(url: string, page: number, limit: number): Observable<{ message: string; data: any[], total: number, page: number, limit: number }> {
    const queryParams = `?page=${page}&limit=${limit}`;
    // console.log('link ', `${this.baseUrl}${url}${queryParams}`, headers)
    return this.http.get<{ message: string; data: any[], total: number, page: number, limit: number }>(`${this.baseUrl}${url}${queryParams}`, {headers})
      .pipe(catchError((error) => {
        // Log the error or do other error handling here
        console.error('An error occurred:', error.message);
        return throwError(() => new Error(statusMessages.error));
      }));
  }
}

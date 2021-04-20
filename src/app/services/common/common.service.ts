import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getApi(url: string): Observable<any> {
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map(res => res),
      catchError(err => { this.catchError(err); return of(err.message) })
    );
  }

  putApi(url: string, putValue: any): Observable<any> {
    return this.http.put(url, putValue, { headers: this.getHeaders() }).pipe(
      map(res => {
        return res = res;
      }),
      catchError(err => {
        this.catchError(err);
        return of(err.message)
      })
    );
  }

  deleteApi(url: string): Observable<any> {
    return this.http.delete(url, { headers: this.getHeaders() }).pipe(
      map(res => res),
      catchError(err => { this.catchError(err); return of(err.message) })
    );
  }

  getBlobApi(url: string): Observable<Blob> {
    return this.http.get(url, { headers: this.getHeaders(), responseType: "blob" }).pipe(
      map(res => res),
      catchError(err => { this.catchError(err); return of(err.message) })
    );
  }

  postApi(url: string, postValue: any): Observable<any> {
    return this.http.post(url, postValue, { headers: this.getHeaders() }).pipe(
      map(res => {
        return res = res;
      }),
      catchError(err => {
        this.catchError(err);
        return of(err.message)
      })
    );
  }

  imgPostApi(url: string, postValue: any) {
    return this.http.post(url, postValue).pipe(
      map(res => res),
      catchError(err => { this.catchError(err); return of(err.message) })
    );
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  private getImageHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data;');
    return headers;
  }

  catchError(err) {
    throw err;
  }

  // private appendAuthHeader(headers: HttpHeaders) {
  //   const token = '';
  //   if (token === '') return headers;
  //   const tokenValue = 'Bearer ' + token;
  //   return headers.set('Authorization', tokenValue);
  // }
}

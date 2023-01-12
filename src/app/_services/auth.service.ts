// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  data: any;
  passwd: string;
  emailid: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isVisible: boolean = true;
  set(){
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
  }
  get(){
    this.isVisible
  }
  // API path
  basePath = 'http://localhost:8000/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  // Verify user credentials on server to get token
  loginForm(data: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('email', resp.emailid);
    localStorage.setItem('access_token', resp.passwd);
    this.router.navigate(['dash/sidebar']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


  // Get data from server for Dashboard
  getData(data:any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
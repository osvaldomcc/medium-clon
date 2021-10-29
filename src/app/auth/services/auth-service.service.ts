import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.API_BASE_URL;

  constructor(private http: HttpClient){}
  
  logUserIn(user: object) : Observable<User>{
    const url: string = `${this._baseUrl}/users/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<User>(url, user, httpOptions);
  }

  registerNewUser(user: object) : Observable<User>{
    const url: string = `${this._baseUrl}/users`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<User>(url, user, httpOptions);
  }

}

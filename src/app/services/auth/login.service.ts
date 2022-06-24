import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { EndPoint } from '../end-point-share';
import { environment } from '../../../environments/environment';
import { ErrorsService } from '../shared/handleError/errors.service';
import { ILoginForm, IResponseLogin } from '../../core/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private errorService: ErrorsService) { }

  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  login( jsonLogin: ILoginForm ) {
    const url = environment.api + EndPoint.login;

    return this.http.post(url, jsonLogin, this.headers).pipe(
      map((resp: IResponseLogin) => {
        return resp;
      }), catchError((err) => this.errorService.handleError(err))
    );
  }
}

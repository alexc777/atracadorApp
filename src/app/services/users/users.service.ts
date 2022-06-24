import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../shared/handleError/errors.service';
import { environment } from '../../../environments/environment';
import { EndPoint } from '../end-point-share';
import { map, catchError } from 'rxjs/operators';
import { IResponRoles, IResponseUsers, IUserParams, IUserEdit } from '../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private errorService: ErrorsService) { }

  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getRoles() {
    const url = environment.api + EndPoint.getRoles;

    return this.http.get(url, this.headers).pipe(
      map((resp: IResponRoles) => resp.data),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  getUser() {
    const url = environment.api + EndPoint.getUsers;

    return this.http.get(url, this.headers).pipe(
      map((resp: IResponseUsers) => resp.data),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  createUser(json: IUserParams) {
    const url = environment.api + EndPoint.createUser;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  editUser(json: IUserEdit) {
    const url = environment.api + EndPoint.editUser;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  deleteUser(json: any) {
    const url = environment.api + EndPoint.deleteUser;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }
}

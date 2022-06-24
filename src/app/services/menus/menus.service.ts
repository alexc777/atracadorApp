import { Injectable } from '@angular/core';
import { ErrorsService } from '../shared/handleError/errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EndPoint } from '../end-point-share';
import { IResponseMenu, IParamsMenu, IEditMenu } from '../../core/interfaces/menu.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http: HttpClient, private errorService: ErrorsService) { }

  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getMenus() {
    const url = environment.api + EndPoint.getMenus;

    return this.http.get(url, this.headers).pipe(
      map((resp: IResponseMenu) => resp.data),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  createMenu(json: IParamsMenu) {
    const url = environment.api + EndPoint.createMenu;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  editMenu(json: IEditMenu) {
    const url = environment.api + EndPoint.editMenu;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  deleteMenu(json: any) {
    const url = environment.api + EndPoint.deleteMenu;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }
}

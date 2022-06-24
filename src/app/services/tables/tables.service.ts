import { Injectable } from '@angular/core';
import { ErrorsService } from '../shared/handleError/errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EndPoint } from '../end-point-share';
import { IResponseTables, IParamsTable, IParamsEditTable } from '../../core/interfaces/table.inteface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient, private errorService: ErrorsService) { }

  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getTables() {
    const url = environment.api + EndPoint.getTables;

    return this.http.get(url, this.headers).pipe(
      map((resp: IResponseTables) => resp.data),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  createTable(json: IParamsTable) {
    const url = environment.api + EndPoint.createTable;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  editTable(json: IParamsEditTable) {
    const url = environment.api + EndPoint.editTable;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  deleteTable(json: any) {
    const url = environment.api + EndPoint.deleteTable;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }
}

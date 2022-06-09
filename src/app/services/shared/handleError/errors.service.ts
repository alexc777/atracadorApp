import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  handleError(errorResponse: any) {
    let errorMessage: any = {};

    if (errorResponse.error.error) {
      errorMessage = {
        code: errorResponse.error.code,
        error: errorResponse.error.error,
        errorDescription: errorResponse.error.message,
        errorCode: errorResponse.status
      };
    } else {
      errorMessage.code = 400;
      errorMessage.error = true;
      errorMessage.errorDescription = `Error en sistema código: ${errorResponse.status}`;
      errorMessage.errorCode = errorResponse.status;
    }

    return throwError(errorMessage);
  }

}

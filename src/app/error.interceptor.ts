import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error : HttpErrorResponse)=>{
      console.error(error);
      let errorMessage = 'An unknown error occured!...';
      if(error.message){
        errorMessage = error.error.message
      }
      this.dialog.open(ErrorComponent,{
        data :{
          message : errorMessage
        }
      });

      return throwError(error);
    }));
  }
}

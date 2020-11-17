import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class AppConfig {

  config: object = null;
  env: object = null;

  constructor(private http: HttpClient) {
  }

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any) {
    return this.config[key];
  }

  /**
   * Use to get the data found in the first file (env file)
   */
  public getEnv(key: any) {
    return this.env[key];
  }

  /**
   * Load Environment files
   *
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "env.[env].json" to get all env's variables (e.g.: 'env.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get<any>('./assets/env/env.json')
        .subscribe(
          envData => {
            this.env = envData;
            this.http.get('./assets/env/env.' + envData.env + '.json')
            .pipe(catchError(this.handleError))
            .subscribe(
              configData => {
                this.config = configData;
                resolve(true);
              }
            );
          }
        );
    });
  }

  /**********************/
  /******* ERROR ********/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

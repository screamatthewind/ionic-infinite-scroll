import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestApiProvider {

  private apiUrl = 'https://reqres.in/api/';

  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  getUsers(page): Observable<string[]> {
    return this.http.get(this.apiUrl+"users?page="+page).pipe(
      map(this.extractData),
      catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError (error: Response | any) {
	  let errMsg: string;
	  if (error instanceof Response) {
		const err = error || '';
		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	  } else {
		errMsg = error.message ? error.message : error.toString();
	  }
	  console.error(errMsg);
	  return Observable.throw(errMsg);
	}
}

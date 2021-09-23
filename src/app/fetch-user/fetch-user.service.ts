import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatchQueryParams, RequestQueryParams } from './query-params.interface';
import { isNil } from 'lodash';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class FetchUserService {

  constructor(private http: HttpClient) { }

  private queryParams$: BehaviorSubject<RequestQueryParams>
        = new BehaviorSubject<RequestQueryParams>({ page:1});

    public getQueryParams(): Observable<RequestQueryParams> {
        return this.queryParams$.asObservable();
    }

    public patchQueryParams(patchQueryParams: PatchQueryParams): void {
        this.queryParams$.next({
            ...this.queryParams$.value,
            ...patchQueryParams
        });
    }

    getUsers():Observable<any>{
      const queryParams: any = {
          ...this.queryParams$.value,
      };

      let params = new HttpParams({
          fromObject: {
          ...queryParams
          }
      })
      return this.http
          .get(`${`https://reqres.in/api/users`}/`,{params})
  }

}

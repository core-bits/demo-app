import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, IResponse } from '../../../core/user.model';
import { ParamUtil } from '../../../core/iparam';
import { IParam, IParamKeyValuePair } from '../../../core/iparam';
import { ISearchField, SearchFieldUtils } from '../../../shared/components/search-input/search-input.component';
import { ISort } from '../../../shared/components/sort/sort.component';
import { LAYOUT_CONFIG } from '../../shared/services/config';

@Injectable()
export class UserService {
  private ROOT_PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http, private util: ParamUtil) { }

  getUserList(): Observable<IUser[]> {
    return this.http.get(this.ROOT_PATH + 'users').map(this.mapToIUser).catch(this.handleError);
  }

  getUserListWithParams(params: IParam): String {
    return this.util.buildQueryParams(this.ROOT_PATH + 'users', params);
  }

  getUserListByParams(params?: IParam, sorted?: ISort, page?: number, limit?: number): Observable<IResponse<IUser[]>> {
    const sortedfield = sorted && sorted.field ? sorted.field : null;
    const sortedorder = sorted && sorted.direction ? sorted.direction.name : null;
    const path: string = this.util.buildQueryParams(this.ROOT_PATH + 'users', params, sortedfield, sortedorder, page, limit);
    return this.http.get(path).map((response : Response) => {
      let header = response.headers;
      let body : IUser[] = <IUser[]>response.json();
      let iresponse : IResponse<IUser[]> = {
        code: "0",
        description: "OK",
        data: body,
        total: 10
      }
      return iresponse;
    }).catch(this.handleError);
  }

  private mapToIUser(response: Response): IUser[] {
    return <IUser[]>response.json();
  }

  private handleError(error) {
    console.log(error);
    return Observable.throw(error);
  }

}

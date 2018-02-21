import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPost } from './ipost';
import { IComment } from './icomment';
import { LAYOUT_CONFIG } from '../../shared/services/config';
import { ParamUtil, IParam, IParamKeyValuePair } from '../../../core/iparam';
import { ISort } from '../../../shared/components/sort/sort.component';
import { IResponse } from '../../../core/user.model';
import { SpinnerService } from '../../../core/spinner/spinner.service';

@Injectable()
export class PostService {
  private ROOT_PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http, private util: ParamUtil, private spinnerService: SpinnerService) { }

  getPostList(): Observable<IPost[]> {
    return this.http.get(this.ROOT_PATH + 'posts').map((response: Response) => {
      return <IPost[]>response.json();
    }).catch(this.handleError)
  }

  getPostListByParams(params?: IParam, sorted?: ISort, page?: number, limit?: number): Observable<IResponse<IPost[]>> {
    var total: IPost[];
    const sortedfield = sorted && sorted.field ? sorted.field : null;
    const sortedorder = sorted && sorted.direction ? sorted.direction.name : null;
    let path: string = this.util.buildQueryParams(this.ROOT_PATH + 'posts', params, sortedfield, sortedorder, page, limit);
    this.spinnerService.show();
    return this.http.get(path).map((response: Response) => {
      let body: IPost[] = <IPost[]>response.json();
      let iresponse: IResponse<IPost[]> = {
        code: "0",
        description: "OK",
        data: body,
        total: 102
      };
      return iresponse;
    }).catch(this.handleError)
    .finally(() => this.spinnerService.hide());
  }

  private handleError(error: Response) {
    return Observable.throw(error)
  }

}

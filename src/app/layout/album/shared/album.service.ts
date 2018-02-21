import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { IAlbum } from './ialbum';
import { IPhoto } from './iphoto';
import { LAYOUT_CONFIG } from '../../shared/services/config';
import { ParamUtil, IParam, IParamKeyValuePair } from '../../../core/iparam';
import { ISort } from '../../../shared/components/sort/sort.component';
import { IResponse } from '../../../core/user.model';
import { SpinnerService } from '../../../core/spinner/spinner.service';

@Injectable()
export class AlbumService {
  private ROOT_PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http, private util: ParamUtil, private spinnerService: SpinnerService) { }

  getAlbumList(): Observable<IAlbum[]> {
    return this.http.get(this.ROOT_PATH + 'albums').map((response: Response) => {
      return <IAlbum[]>response.json();
    }).catch(this.handleError)
  }

  getPostListByParams(params?: IParam, sorted?: ISort, page?: number, limit?: number): Observable<IResponse<IAlbum[]>> {
    const sortedfield = sorted && sorted.field ? sorted.field : null;
    const sortedorder = sorted && sorted.direction ? sorted.direction.name : null;
    const path: string = this.util.buildQueryParams(this.ROOT_PATH + 'albums', params, sortedfield, sortedorder, page, limit);
    this.spinnerService.show();
    return this.http.get(path).map((response: Response) => {
      let headers: Map<string, Array<string>> = response.headers['_headers'];
      let link: string[] = headers.get('link');
      let arr: Array<string> = link[0].split(",");
      let last: string = arr[arr.length - 1];
      //console.log(last);
      let body: IAlbum[] = <IAlbum[]>response.json();
      let iresponse: IResponse<IAlbum[]> = {
        code: "0",
        description: "OK",
        data: body,
        total: 100
      };
      return iresponse;
    }).catch(this.handleError)
    .finally(() => this.spinnerService.hide());
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

}

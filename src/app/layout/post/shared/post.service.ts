import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPost } from './ipost';
import { IComment } from './icomment';
import { LAYOUT_CONFIG } from '../../shared/services/config';

@Injectable()
export class PostService {
  private ROOT_PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http) { }

  getPostList(): Observable<IPost[]> {
    return this.http.get(this.ROOT_PATH + 'posts').map((response: Response) => {
      return <IPost[]>response.json();
    }).catch(this.handleError)
  }

  private handleError(error: Response) {
    return Observable.throw(error)
  }

}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { IAlbum } from './ialbum';
import { IPhoto } from './iphoto';
import { LAYOUT_CONFIG } from '../../shared/services/config';

@Injectable()
export class AlbumService {
  private ROOT_PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http) { }

  getAlbumList(): Observable<IAlbum[]> {
    return this.http.get(this.ROOT_PATH + 'albums').map((response: Response) => {
      return <IAlbum[]>response.json();
    }).catch(this.handleError)
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

}

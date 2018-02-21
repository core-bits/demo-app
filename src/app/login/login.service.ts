import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../core/user.model';
import { UserProfileService } from '../core/user-profile.service';
import { LAYOUT_CONFIG } from '../layout/shared/services/config';
import { SpinnerService } from '../core/spinner/spinner.service';

@Injectable()
export class LoginService {
  private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http, private currentUser: UserProfileService, private spinnerService: SpinnerService) { }

  authenticateUser(username: string, password: string): Observable<Response> {
    this.spinnerService.show();
    return this.http.get(this.PATH + 'users?username=' + username + '&password=' + password)
    .do((response: Response) => {
      if (response != null) {
        this.currentUser.user = <IUser>response.json()[0];
        this.currentUser.isLoggedIn = !!this.currentUser.user;
      }
    }).catch(this.handleErrorBoolean).finally(() => this.spinnerService.hide());
  }

  //   mockCallAll(): Observable<IPost[]> {
  //     return this.http.get(this.rootPath + 'posts').map((response: Response) => {
  //       return <IPost[]>response.json();
  //     }).catch(this.handleError);
  //   }

  //   mockCallById(): Observable<IPost> {
  //     return this.http.get(this.rootPath + 'posts/1').map((response: Response) => {
  //       return <IPost>response.json();
  //     });
  //   }

  //   mockCallByParams(): Observable<IUser> {
  //     return this.http.get(this.rootPath + 'users?username=Bret&password=ciao').map((response: Response) => {
  //       return <IUser>response.json();
  //     });
  //   }

  //   mockPost(): Observable<IPost> {
  //     return this.http.get(this.rootPath + 'posts').map((response: Response) => {
  //       return <IPost>response.json();
  //     });
  //   }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  private handleErrorBoolean(error: Response){
    return Observable.throw(false);
  }

}

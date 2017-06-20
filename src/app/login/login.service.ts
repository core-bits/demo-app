import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../core/user.model';
import { UserProfileService } from '../core/user-profile.service';
import { LAYOUT_CONFIG } from '../layout/shared/services/config';

@Injectable()
export class LoginService {
  private PATH = LAYOUT_CONFIG.ROOT_PATH.ENV.DEVELOPMENT;

  constructor(private http: Http, private currentUser: UserProfileService) { }

  authenticateUser(username: string, password: string): Observable<Response> {    
      return this.http.get(this.PATH + 'users?username=' + username + '&password=' + password).do((response: Response) => {
        if (response) {
          this.currentUser.user = <IUser>response.json()[0];
          this.currentUser.isLoggedIn = !!this.currentUser.user;
        }
      }).catch(error => {
        return Observable.of(false);
      });
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

}

import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable()
export class UserProfileService {
    isLoggedIn: boolean = false;
    user: IUser;

    constructor(){}
}
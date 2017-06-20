import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/user-profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  appTitle = 'Demo Application';

  constructor(private auth: UserProfileService, private router: Router) { }

  ngOnInit() { }

  logout() {
    this.auth.isLoggedIn = false;
    this.auth.user = null;
    this.router.navigate(['login']);
  }

}

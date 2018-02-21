import { Component, OnInit } from '@angular/core';
import { UserProfileService } from "app/core/user-profile.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-horizontal-navbar',
  templateUrl: './horizontal-navbar.component.html',
  styleUrls: ['./horizontal-navbar.component.css']
})
export class HorizontalNavbarComponent implements OnInit {

  appTitle = 'XTelth';

  constructor(private auth: UserProfileService, private router: Router) { }

  ngOnInit() { }

  logout() {
    this.auth.isLoggedIn = false;
    this.auth.user = null;
    this.router.navigate(['login']);
  }

}

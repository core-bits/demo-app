import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashBoardComponent implements OnInit {
title = '[Dashboard Content Goes Here]';
  constructor() { }

  ngOnInit() {
  }

}

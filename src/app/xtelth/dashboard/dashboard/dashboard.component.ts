import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parent: string = "Parent: Here is your school fees";
  message: string;

  constructor() { }

  ngOnInit() {
  }

  handleChildClick(e){
    console.log('parent: ', e);
    this.message = e;
  }

}

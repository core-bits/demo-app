import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.css']
})
export class LayoutFooterComponent implements OnInit {
  appYear : number;

  constructor() { }

  ngOnInit() {
    this.appYear = new Date().getFullYear();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-dashboard',
  templateUrl: './child-dashboard.component.html',
  styleUrls: ['./child-dashboard.component.css']
})
export class ChildDashboardComponent implements OnInit {
  @Input()
  parent: string;
  @Output()
  child: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleClick(): void{
    this.child.emit('Thank you Parent. Here is the receipt');
  }

}

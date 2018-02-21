import { Component, OnInit, Inject } from '@angular/core';
import { IHacker, IXpyExecution, IXpyExecutionLog } from "app/xtelth/shared/services/xtelth-objects";
import { XpyExecutionService } from "app/xtelth/xpy/xpy.service";
import { TOASTR_TOKEN } from "app/core/toastr.service";
import { UserProfileService } from "app/core/user-profile.service";

@Component({
  selector: 'app-xpy',
  templateUrl: './xpy.component.html',
  styleUrls: ['./xpy.component.css']
})
export class XpyComponent implements OnInit {
  hackers: IHacker[];
  selectedHacker: IHacker;
  xpyExecutions: IXpyExecution[];
  selectedXpyExecution: IXpyExecution;
  xpyExecutionLogs: IXpyExecutionLog[];

  constructor(private xpyService: XpyExecutionService, @Inject(TOASTR_TOKEN) private toastr: any,
    private auth: UserProfileService) { }

  ngOnInit() {
    this.getHackerList();
  }

  onHackerSelected(hacker: IHacker) {
    this.selectedHacker = hacker;
    this.getXpyExecutionList(hacker.id);
  }

  onXpyExecutionSelected(xpyExecution: IXpyExecution) {
    this.selectedXpyExecution = xpyExecution;
    this.getXpyExecutionLogList(xpyExecution.id);
  }

  private getHackerList() {
    this.xpyService.getHackerList().subscribe((response) => {
      this.hackers = response.data;
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('getHackerList call completed!');
    });
  }

  private getXpyExecutionList(hackerId: number) {
    this.xpyService.getXpyExecutionList(hackerId).subscribe((response) => {
      this.xpyExecutions = response.data;
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('getXpyExecutionList call completed!');
    });
  }

  private getXpyExecutionLogList(xpyLogId: number) {
    this.xpyService.getXpyExecutionLogList(xpyLogId).subscribe((response) => {
      this.xpyExecutionLogs = response.data;
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('getXpyExecutionLogList call completed!');
    });
  }

}

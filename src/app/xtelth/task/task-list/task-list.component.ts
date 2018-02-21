import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "app/xtelth/task/task.service";
import { TOASTR_TOKEN } from "app/core/toastr.service";
import { UserProfileService } from "app/core/user-profile.service";
import { ITask, ITaskGroup } from "app/xtelth/shared/services/xtelth-objects";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  groupTask: ITask[];
  tasks: ITask[] = [];
  groups: ITaskGroup[] = [];
  selected: ITask;
  isNew: boolean = false;

  constructor(private taskService: TaskService, @Inject(TOASTR_TOKEN) private toastr: any,
    private auth: UserProfileService) { }

  ngOnInit() {
    this.getTaskList();
  }

  onSelect(task: ITask) {
    this.selected = task;
  }

  toggleClick() {
    this.isNew = !this.isNew;
  }

  private buildTask() {
    if (this.groupTask != null) {
      this.groupTask.forEach((group => {
        group.children.forEach((child => {
          this.tasks.push(child);
        }));
      }));
    }
  }

  private getTaskList() {
    this.taskService.getTaskGroupList().subscribe((response) => {
      this.groupTask = response.data;
      this.buildTask();
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('TaskListComponent::getTaskList call completed!');
    });
  }

}

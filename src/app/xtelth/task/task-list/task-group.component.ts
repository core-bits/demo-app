import { Component, Inject } from "@angular/core";
import { TOASTR_TOKEN } from "app/core/toastr.service";
import { TaskService } from "app/xtelth/task/task.service";
import { ITaskGroup } from "app/xtelth/shared/services/xtelth-objects";

@Component({
    selector: 'app-task-group',
    templateUrl: './task-group.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskGroupComponent {

    constructor( @Inject(TOASTR_TOKEN) private toastr: any, private taskService: TaskService) { }

    onSubmit(formValues: any): void{
        console.log(formValues);
        let taskGroup : ITaskGroup = {
            id: null,
            name: formValues.name,
            description: formValues.description
        }
        this.createTaskGroup(taskGroup);
    }

    private createTaskGroup(taskGroup: ITaskGroup): void {
        this.taskService.createTaskGroup(taskGroup).subscribe((response) => {
            this.toastr.success("Completed Successfully", "Success");
        }, err => {
            this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
        }, () => {
            console.log('getTaskList call completed!');
        });
    }
}
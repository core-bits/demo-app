import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "app/xtelth/task/task.service";
import { TOASTR_TOKEN } from "app/core/toastr.service";
import { UserProfileService } from "app/core/user-profile.service";
import { ITask, ITaskGroup, IOSPlatform, IScript } from "app/xtelth/shared/services/xtelth-objects";
import { FormGroup, FormBuilder, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { TaskScriptComponent } from 'app/xtelth/task/new-task/task-script.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  groupTask: ITask[];
  groups: ITaskGroup[] = [];
  osPlatforms: IOSPlatform[];
  scripts: IScript[] = [];
  selectedScript: IScript;
  taskGroup: FormGroup;
  scriptArray: FormArray = new FormArray([]);

  constructor(private taskService: TaskService, @Inject(TOASTR_TOKEN) private toastr: any,
    private auth: UserProfileService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formInit();
    this.getTaskList();
    this.getOSPlatformList();
  }

  private formInit(): void {
    this.taskGroup = this.fb.group({
      group: '',
      name: '',
      description: '',
      scriptArrayGroup: this.scriptArray
    });
  }

  private updateFormInit(): void {
    this.scripts.map((item => {
      this.scriptArray.push(this.fb.group({
        osPlatform: { value: item.osPlatform, hidden: true },
        scriptName: item.script,
        inputParameterArrayGroup: this.fb.array([])
      }));
    }));
  }

  isSelectedPlatform(index: number): boolean {
    let script = this.scripts[index];
    return script.osPlatform.id == this.selectedScript.osPlatform.id;
  }

  selectScript(script: IScript) {
    this.selectedScript = script;
  }

  isActiveButton(script: IScript): boolean {
    if (this.selectedScript) {
      return script.osPlatform.id == this.selectedScript.osPlatform.id;
    }
    return false;
  }

  submit(): void {
    console.log(this.taskGroup.value);
  }

  get scriptArrayGroup(): FormGroup {
    return this.taskGroup.get('scriptArrayGroup') as FormGroup;
  }

  addParameter(index: number): void {
    (<FormArray>(<FormGroup>(this.scriptArrayGroup)
      .controls[index])
      .controls['inputParameterArrayGroup']).push(this.fb.group({
        paramInput: null
      }));
  }

  removeParameter(parentIndex: number, childIndex: number): void {
    (<FormArray>(<FormGroup>(this.scriptArrayGroup)
      .controls[parentIndex])
      .controls['inputParameterArrayGroup']).removeAt(childIndex);
  }

  private buildGroupTask() {
    if (this.groupTask != null) {
      let taskGrp: ITaskGroup;
      this.groupTask.forEach((g => {
        taskGrp = {
          id: g.id,
          name: g.name,
          description: g.description
        }
        this.groups.push(taskGrp);
      }));
    }
  }

  private getTaskList() {
    this.taskService.getTaskGroupList().subscribe((response) => {
      this.groupTask = response.data;
      this.buildGroupTask();
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('NewTaskComponent::getTaskList call completed!');
    });
  }

  private getOSPlatformList() {
    this.taskService.getOSPlatformList().subscribe((response) => {
      this.osPlatforms = response.data;
      console.log(this.osPlatforms);
      this.scriptInit();
      this.updateFormInit();
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('NewTaskComponent::getOSPlatformList call completed!');
    });
  }

  private scriptInit(): void {
    this.osPlatforms.map((item => {
      this.scripts.push({
        script: '',
        osPlatform: item,
        inputParameter: []
      })
    }));
  }

}

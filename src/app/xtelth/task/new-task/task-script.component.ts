import { Component, Input, OnInit, EventEmitter, Output, OnChanges, ChangeDetectionStrategy } from "@angular/core";
import { IOSPlatform, IScript } from "app/xtelth/shared/services/xtelth-objects";
import { FormArray, FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'app-task-script',
    templateUrl: './task-script.component.html',
    styles: ['.os-script-input-fix{margin-bottom: 10px;}', '.param-fix{ margin-bottom: 10px;}', '.param-input-fix{ margin-bottom: 5px; margin-left: 0px;}']
})
export class TaskScriptComponent implements OnChanges {
    @Input()
    selectedScript: IScript;
    @Input()
    scripts: IScript[] = [];
    @Input()
    formGroup: FormGroup;

    ngOnChanges(): void {
        //console.log('changes', this.scriptArrayGroup.controls);
    }

    isSelectedPlatform(index: number): boolean {
        let script = this.scripts[index];
        return script.osPlatform.id == this.selectedScript.osPlatform.id;
    }

    get scriptArrayGroup(): FormArray {
        return this.formGroup.get('scriptArrayGroup') as FormArray;
    }

    addParameter(index: number): void {
        console.log('index => ', index);
        (<FormArray>(<FormGroup>(this.scriptArrayGroup)
        .controls[index])
        .controls['inputParameterArrayGroup']).push(new FormGroup({
            paramInput: new FormControl()
        }));
        console.log('addParameter: ', (<FormGroup>(this.scriptArrayGroup)
        .controls[index]));
    }

    removeParameter(parentIndex: number, childIndex: number): void {
        (<FormArray>(<FormGroup>(this.scriptArrayGroup)
        .controls[parentIndex])
        .controls['inputParameterArrayGroup']).removeAt(childIndex);
    }
}
import { Component, Input, OnInit } from "@angular/core";
import { ITaskInputParameter } from "app/xtelth/shared/services/xtelth-objects";
import { FormBuilder, FormArray, FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'app-input-parameter',
    templateUrl: './input-parameter.component.html',
    styles: ['.param-fix{ margin-bottom: 10px;}', '.param-input-fix{ margin-bottom: 5px; margin-left: 0px;}']
})
export class InputParameterComponent implements OnInit {
    empty: boolean;
    @Input()
    formGroup: FormGroup;
    @Input()
    inputParameters: ITaskInputParameter[] = [];
    @Input()
    parentIndex: number;
    @Input()
    scriptItem: FormGroup;

    constructor() { }

    ngOnInit(): void {
        console.log('input parameter: ', this.formGroup);
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
    }

    removeParameter(parentIndex: number, childIndex: number): void {
        (<FormArray>(<FormGroup>(this.scriptArrayGroup)
        .controls[parentIndex])
        .controls['inputParameterArrayGroup']).removeAt(childIndex);
    }

}
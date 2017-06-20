import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Injectable } from '@angular/core';

import { IParam, IParamKeyValuePair } from '../../../core/iparam';

export interface ISearchField {
    id: string;
    name: string;
    startValue?: string;
    endValue?: string;
    inputType: IInputType;
    operationType: IOperationType;
}

export interface IInputType {
    name: string;
    description?: string;
}

export interface IOperationType {
    name: string;
    description?: string;
}

@Injectable()
export class SearchFieldConfig{
    //Permitted Input Type
    TEXT: IInputType = {
        name: 'text',
        description: 'Text Input Type'
    };
    DATE: IInputType = {
        name: 'date',
        description: 'Date Input Type'
    };
    DATETIME: IInputType = {
        name: 'datetime',
        description: 'Datetime Input Type'
    };
    NUMERIC: IInputType = {
        name: 'numeric',
        description: 'Numeric Input Type'
    };
    DECIMAL: IInputType = {
        name: 'decimal',
        description: 'Decimal Input Type'
    };

    //Permitted Operation/Operator Type
    EQUAL: IOperationType = {
        name: "Equal",
        description: "Equal"
    };
    LESS_THAN: IOperationType = {
        name: "Less Than",
        description: "Less Than (<)"
    };
    LESS_THAN_OR_EQUAL_TO: IOperationType = {
        name: "Less Than or Equal To",
        description: "Less Than or Equal To (<=)"
    };
    GREATER_THAN: IOperationType = {
        name: "Greater Than",
        description: "Greater Than (>)"
    };
    GREATER_THAN_OR_EQUAL_TO: IOperationType = {
        name: "Greater Than or Equal To",
        description: "Greater Than or Equal To (>=)"
    };
    IN: IOperationType = {
        name: "In",
        description: "In"
    };
}

@Injectable()
export class SearchFieldUtils {
    coll: ISearchField[] = [];

    constructor() { }

    buildISearchFieldArray(field: ISearchField) : void {        
        let arr: ISearchField[] = this.coll
            .filter((item: ISearchField) => item.name !== field.name);
        if (field && field.startValue.length > 0) {
            arr.push(field);
        }
        this.coll = arr;
    } 

    buildIParams(fields: ISearchField[]): IParam {
        let param: IParam;
        let keyValuePair: IParamKeyValuePair[] = fields
            .filter(pair => pair.startValue.length > 0)
            .map((item: ISearchField) => {
                return {
                    key: item.name,
                    value: item.startValue
                }
            });
        param = {
            keyValue: keyValuePair
        };
        return param;
    }
}

@Component({
    selector: 'search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.css']
})
export class SearchTextComponent implements OnInit {
    @Input('search-field') searchable: ISearchField;
    @Output() changed: EventEmitter<ISearchField[]>;
    htmlElement: HTMLElement;
    inputNode: HTMLElement;
    emptyString: string = '';

    constructor(private el: ElementRef, private searchUtil: SearchFieldUtils) {
        this.changed = new EventEmitter<ISearchField[]>();
        this.htmlElement = this.el.nativeElement;
    }

    ngOnInit() {
        this.inputNode = <HTMLElement>this.htmlElement.firstChild;
    }

    private filterChanged(event: any) {
        event.preventDefault();
        this.searchable.startValue = this.searchable.startValue || this.emptyString;
        this.searchable.endValue = this.searchable.endValue || this.emptyString;
        this.searchUtil.buildISearchFieldArray(this.searchable);
        this.changed.emit(this.searchUtil.coll);
    }

}
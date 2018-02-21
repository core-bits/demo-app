import { Component, Input } from "@angular/core"

@Component({
    selector: 'no-record-found',
    templateUrl: './no-record-found-component.html'
})
export class NoRecordFoundComponent {
    private size: number;
    @Input() cols: number;
    @Input() collection: any[];

    constructor() { }

    isEmpty(): boolean {
        return (this.collection == null || typeof this.collection == undefined || this.collection.length == 0);
    }

    isNotEmpty(): boolean {
        return (this.collection != null && this.collection.length > 0)
    }
}
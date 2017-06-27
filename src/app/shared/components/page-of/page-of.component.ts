import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
    selector: 'page-of',
    template: `
    {{first}} ... {{last}} of {{total}}
    `
})
export class PageOfComponent implements OnChanges {
    @Input() current;
    @Input() total;
    @Input('page-size') pageSize;
    private first: number;
    private last: number;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        this.computePageOf();
    }

    private computePageOf(): void {
        this.current = this.current > 0 ? this.current - 1 : this.current;
        this.first = Math.min(this.current * this.pageSize + 1, this.total);
        this.last = Math.min((this.current + 1) * this.pageSize, this.total);
    }
}
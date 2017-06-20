import { Directive, OnChanges, SimpleChanges, SimpleChange, Input, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import {ISort, ISortOrder, SortConfig} from './sort.component';


@Directive({
    selector: '[appSort]'
})
export class SortDirective implements OnChanges {
    @Input() sortBy;
    @Input() sortOrder;
    subject: ReplaySubject<ISort>;
    changed : EventEmitter<ISort>;

    constructor(private sortConfig: SortConfig) {
        this.subject = new ReplaySubject<ISort>(1);
        this.changed = new EventEmitter<ISort>(true);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['sortBy'] || changes['sortOrder']) {
            const order: ISortOrder = this.sortConfig.ASC.name === this.sortOrder ? this.sortConfig.ASC : this.sortConfig.DESC.name === this.sortOrder ? this.sortConfig.DESC : null;
            this.subject.next({field: this.sortBy, direction: order});
        }
    }

    sort(sort: ISort){
        if(this.sortBy !== sort.field && this.sortOrder !== sort.direction.name){
            this.subject.next(sort);
            this.changed.emit(sort);
        }
    }
}
import { Component, Input, Output, EventEmitter, OnInit, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { SortDirective } from './sort.directive';
import { UserProfileService } from '../../../core/user-profile.service';


export interface ISort {
    field: string;
    direction?: ISortOrder;
}

export interface ISortOrder {
    name: string;
    description?: string;
}


@Injectable()
export class SortConfig {
    ASC: ISortOrder = {
        name: "asc",
        description: "Ascending"
    };
    DESC: ISortOrder = {
        name: "desc",
        description: "Descending"
    };
    subject: ReplaySubject<ISort>;

    constructor(private userService: UserProfileService) {
        this.subject = new ReplaySubject<ISort>();
    }

    doSort(sort: ISort) {
        this.subject.next(sort);
    }

}
/**
 * Sort component. It takes in input the field to be sorted and the sort order (optional).
 * Note: Presently permits sorting for single column at a time. Feature to handle multiple column sort to be implemented.
 */
@Component({
    selector: 'sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
    @Input('sort-field') sortable: ISort;
    @Output() changed: EventEmitter<ISort>;
    private asc: boolean;
    private desc: boolean;
    subject: ReplaySubject<ISort> = new ReplaySubject<ISort>();

    constructor(private sortConfig: SortConfig, private userService: UserProfileService) {
        this.changed = new EventEmitter<ISort>();
    }

    ngOnInit() {
        this.sortConfig.subject.subscribe((sort: ISort) => {
            this.asc = sort.field === this.sortable.field && sort.direction.name === this.sortConfig.ASC.name;
            this.desc = sort.field === this.sortable.field && sort.direction.name === this.sortConfig.DESC.name;
        });
        const isActive = this.sortable.direction && (this.sortable.direction === this.sortConfig.ASC || this.sortable.direction === this.sortConfig.DESC)
        if (isActive) {
            this.sortConfig.subject.next(this.sortable);
            this.changed.emit(this.sortable);
        }
    }

    private onSortChange() {
        if (this.asc) {
            this.sortable.direction = this.sortConfig.DESC;
            this.changed.emit(this.sortable);
            this.sortConfig.doSort(this.sortable);
        } else {
            this.sortable.direction = this.sortConfig.ASC
            this.changed.emit(this.sortable);
            this.sortConfig.doSort(this.sortable);
        }
    }
}
import {
    Component, Input, Output, EventEmitter,
    ChangeDetectionStrategy, OnChanges,
    SimpleChanges, SimpleChange
} from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
    pageCount: number = 0;
    pages: number[] = [];
    @Input('total-size') totalSize: number;
    @Input('page-size') pageSize: number;
    @Input('current-page') current?: number;
    @Input() max?: number;
    @Output() changed: EventEmitter<number>;

    constructor() {
        this.changed = new EventEmitter<number>(true);
    }

    ngOnChanges(changes: SimpleChanges) {
        let pageSizeChange: SimpleChange = changes['pageSize'];
        if (pageSizeChange && pageSizeChange.firstChange === false && pageSizeChange.currentValue !== pageSizeChange.previousValue) {
            this.current = 1;
        }
        this.load();
    }

    private load() {
        if (this.totalSize > 0 && this.pageSize > 0) {
            this.pageCount = Math.ceil(this.totalSize / this.pageSize);
            this.pageCount = this.pageCount && this.pageCount > 0 ? this.pageCount : 0;
            this.max = this.max && this.max <= this.pageCount ? this.max : this.pageCount >= 5 ? 5 : this.pageCount;
            this.current = this.current && this.current <= this.pageCount ? this.current : 1;

            this.pages = [];
            for (let i = 1; i <= this.pageCount; i++) {
                this.pages.push(i);
            }

            if (this.max > 0 && this.pageCount > this.max) {
                let start = 0;
                let end = this.pageCount;
                [start, end] = this.rotatePagination();
                this.pages = this.pages.slice(start, end);
            }
        } else {
            console.warn(`[total-size]=${this.totalSize} and [page-size]=${this.pageSize}. Permitted values must be greater than zero.`);
        }
    }

    private changePage(pageNo): void {
        if (pageNo < 1) {
            return;
        }
        const previous = this.current;
        this.current = Math.max(Math.min(pageNo, this.pageCount), 0);
        this.load();

        if (previous !== this.current) {
            this.onPaginateChange(this.current);
        }
    }

    private hasPrevious(): boolean {
        return this.current > 1;
    }

    private hasNext(): boolean {
        return this.current < this.pageCount;
    }

    private onPaginateChange(event) {
        this.changed.emit(event);
    }

    /**
   * Rotates page numbers based on max items visible.
   * Currently selected page stays in the middle:
   *
   * Ex. for selected page = 6:
   * [5,*6*,7] for maxSize = 3
   * [4,5,*6*,7] for maxSize = 4
   */
    private rotatePagination(): [number, number] {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.max / 2);
        let rightOffset = this.max % 2 === 0 ? leftOffset - 1 : leftOffset;

        if (this.current <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.max;
        } else if (this.pageCount - this.current < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.max;
        } else {
            // rotate
            start = this.current - leftOffset - 1;
            end = this.current + rightOffset;
        }

        return [start, end];
    }

}
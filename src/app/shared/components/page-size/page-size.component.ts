import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Injectable , OnInit} from '@angular/core';

@Injectable()
export class PageSizeConfig{
    collection: number[] = [5, 10, 25, 50, 100];
    default : number = this.collection[0];
}

@Component({
    selector: 'page-size',
    templateUrl: './page-size.component.html',
    styleUrls: ['./page-size.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSizeComponent implements OnInit{
    private selected: number;
    @Input() collection: number[];
    @Input() default?: number;
    @Output() changed: EventEmitter<number>;

    constructor(private pageSizeConfig: PageSizeConfig) {
        this.changed = new EventEmitter<number>(true);        
    }

    ngOnInit(){
        this.collection = this.collection || this.pageSizeConfig.collection;
        this.selected = this.default || this.pageSizeConfig.default;
        this.default = this.selected;
    }

    private onChange(event) {
        this.changed.emit(event);
    }
}
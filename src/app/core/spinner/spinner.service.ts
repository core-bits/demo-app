import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface SpinnerState {
    show: boolean;
}

@Injectable()
export class SpinnerService {
    private spinnerSubject: Subject<SpinnerState> = new Subject<SpinnerState>();
    spinnerState = this.spinnerSubject.asObservable();

    constructor( @Optional() @SkipSelf() private prior: SpinnerService) {
        if (prior) {
            return prior;
        }
        console.log('Spinner service created!');
    }

    show() {
        this.spinnerSubject.next(<SpinnerState>{ show: true });
    }

    hide() {
        this.spinnerSubject.next(<SpinnerState>{ show: false });
    }
}
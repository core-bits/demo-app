import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerService, SpinnerState } from './spinner.service';


@Component({
    moduleId: module.id,
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit {
    visible: boolean = false;

    private spinnerStateChanged: Subscription;

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe((state: SpinnerState) => this.visible = state.show);
    }

    ngOnDestroy() {
        this.spinnerStateChanged.unsubscribe();
    }
}
import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'custom-modal',
    template: `
    <div id="{{modalId}}" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title">{{modalTitle}}</h4>
                </div>
                <div class="modal-body">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    </div>
    `
})
export class CustomModalComponent implements OnInit{
    @Input('modal-title') modalTitle  : string;
    @Input('modal-id') modalId : string;

    constructor(){}

    ngOnInit(){}
}
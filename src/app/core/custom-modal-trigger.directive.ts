import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQUERY_TOKEN } from './jquery.service';

@Directive({
    selector: '[custom-modal-trigger]'
})
export class CustomModalTriggerDirective implements OnInit {
    el: HTMLElement;
    @Input('custom-modal-trigger') modalId : string;

    constructor( @Inject(JQUERY_TOKEN) private $: any, private element: ElementRef) {
        this.el = this.element.nativeElement;
     }

    ngOnInit() {
        this.el.addEventListener('click', func => {
            this.$(`#${this.modalId}`).modal({});
        });
    }

}
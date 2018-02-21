import { Directive, OnInit, Inject, ElementRef, Input, HostListener } from "@angular/core";
import { JQUERY_TOKEN } from "app/core/jquery.service";
import { ITaskInputParameter } from "app/xtelth/shared/services/xtelth-objects";

@Directive({
    selector: '[app-popover]',    
})
export class PopoverDirective {
    @Input() params: ITaskInputParameter[] = [];
    @Input() title: string = "";
    @Input() content: string = "";

    constructor( @Inject(JQUERY_TOKEN) private $: any, private e: ElementRef) { }

    @HostListener('click') onClick() {
        this.popover();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.popover();
    }

    private buildContent(): void{
        if(this.params == null || this.params.length == 0){
            this.content = (this.content != null && this.content.length > 0) ? this.content : "N/A";
            return;
        }
        this.params.forEach((p =>{
            this.content += "<p>" + p.value + "</p>";
        }));
    }

    private popover() {
        this.buildContent();
        this.$(`#${this.e.nativeElement.id}`).popover({
            title: this.title,
            content: this.content,
            trigger: "hover focus",
            html: true
        });
    }
}
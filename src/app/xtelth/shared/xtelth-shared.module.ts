import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoRecordFoundComponent } from "app/xtelth/shared/components/no-record-found.component";
import { PopoverDirective } from "app/xtelth/shared/directives/popover.directive";

@NgModule({
    imports: [CommonModule],
    exports: [NoRecordFoundComponent, PopoverDirective],
    declarations: [NoRecordFoundComponent, PopoverDirective]
})
export class XTelthSharedModule {

}
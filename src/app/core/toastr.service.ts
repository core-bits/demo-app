import { OpaqueToken } from '@angular/core';

export let TOASTR_TOKEN = new OpaqueToken('toastr');

export interface IToastr{
    success(message: string, title?: string);
    info(message: string, title?: string);
    warning(message: string, title?: string);
    error(messagge: string, title?: string);
}
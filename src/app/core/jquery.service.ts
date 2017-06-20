import { OpaqueToken } from '@angular/core';

export const JQUERY_TOKEN = new OpaqueToken('jQuery');

export function jqueryFunction() {
    return window['jQuery'];
}

export const JQUERY_PROVIDER = { provide: JQUERY_TOKEN, useFactory: jqueryFunction };

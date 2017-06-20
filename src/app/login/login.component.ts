import { Component, Input, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { JQUERY_TOKEN } from '../core/jquery.service';
import { TOASTR_TOKEN } from '../core/toastr.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Input('modal-id') modalId;
    loginInvalid: boolean = false;
    loginInProgress: boolean = false;

    constructor(private auth: LoginService, @Inject(JQUERY_TOKEN) private $: any, private router: Router, @Inject(TOASTR_TOKEN) private toastr: any) { }

    login(formValues) {
        this.loginInProgress = true;
        this.auth.authenticateUser(formValues.username, formValues.password).subscribe((response: Response) => {
            //To be reviewed. Currently using fake (mocked) response
            if (response && response['_body'] == "[]") {
                this.loginInvalid = true;
                this.toastr.error("Invalid Username or Password", "Login Error");
            } else {
                this.router.navigate(['layout/dashboard']);
            }
            this.loginInProgress = false;
        });
    }

    private closeModal(): void {
        this.$(`#${this.modalId}`).modal('hide');
    }
}
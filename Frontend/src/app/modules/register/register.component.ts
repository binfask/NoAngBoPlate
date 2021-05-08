import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    public registerForm: FormGroup;
    constructor(
        private router: Router,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) { }

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required]),
            retypePassword: new FormControl(null, [Validators.required])
        });
    }

    register() {
        if (this.registerForm.valid) {
            this.appService.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password).subscribe(
                data => {
                    console.log(data);
                    this.toastr.error(" Your registration is successful! ");
                    this.router.navigate(['/']);
                },
                err => {
                    this.toastr.error(err.error.message);
                }
            );
        } else {
            this.toastr.error('Hello world!', 'Toastr fun!');
        }
    }

    // register() {
    //     if (this.registerForm.valid) {
    //         this.appService.register(this.registerForm.value);
    //     } else {
    //         this.toastr.error('Hello world!', 'Toastr fun!');
    //     }
    // }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
}

import {Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { TokenStorageService } from '@services/token-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    public loginForm: FormGroup;
    public isAuthLoading = false;
    roles: string[] = [];
    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.roles = this.tokenStorage.getUser().roles;
        this.loginForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    async login() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            this.appService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
                data => {
                  this.tokenStorage.saveToken(data.accessToken);
                  this.tokenStorage.saveUser(data);
                  this.roles = this.tokenStorage.getUser().roles;
                  this.router.navigate(['/']);
                },
                err => {
                    this.toastr.error(err.error.message);
                }
              );
            this.isAuthLoading = false;
            // this.isAuthLoading = true;
            // await this.appService.login(this.loginForm.value);
            // this.isAuthLoading = false;
        } else {
            this.toastr.error('Hello world!', 'Toastr fun!');
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}

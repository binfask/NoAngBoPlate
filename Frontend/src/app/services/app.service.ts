import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '@services/token-storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private tokenStorage: TokenStorageService,private router: Router, private toastr: ToastrService, private http: HttpClient) { }

    // async login({ email, password }) {
    //     try {
    //         const token = await Gatekeeper.loginByAuth(email, password);
    //         localStorage.setItem('token', token);
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    login(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
          username,
          password
        }, httpOptions);
      }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
          username,
          email,
          password
        }, httpOptions);
      }

    // async register({email, password}) {
    //     try {
    //         const token = await Gatekeeper.registerByAuth(email, password);
    //         localStorage.setItem('token', token);
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async loginByGoogle() {
    //     try {
    //         const token = await Gatekeeper.loginByGoogle();
    //         localStorage.setItem('token', token);
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async registerByGoogle({ email, password }) {
    //     try {
    //         const token = await Gatekeeper.registerByGoogle();
    //         localStorage.setItem('token', token);
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async getProfile() {
    //     this.user = await Gatekeeper.getProfile();
    // }

    async getProfile() {
        console.log(this.user)
        this.user = await this.tokenStorage.getUser()
    }

    logout(): void {
        this.user = null;
        this.tokenStorage.signOut();
        window.location.reload();
      }

    // logout() {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('gatekeeper_token');
    //     this.user = null;
    //     this.router.navigate(['/login']);
    // }
}

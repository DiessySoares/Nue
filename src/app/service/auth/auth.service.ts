import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

import { UserService } from './../user/user.service'

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private userService: UserService, private toastrService: NbToastrService, private router: Router) { }

    private userLoggedIn: User = null;

    public login(username: string, password: string) {
        this.userService.getUser(username).then(user => {

            if (user != null) {                                     // Usuario existe
                this.digestMessage(password).then(passSHA256 => {
                    if (passSHA256 == user.usuPasswordSHA256) {
                        this.userLoggedIn = user;
                        this.router.navigate(['home']);
                    } else {
                        this.toastrService.show('Usuario ou senha incorretos!', 'Erro!',
                            {
                                status: 'danger',
                                position: <any>'top-right',
                                duration: <any>'3000',
                                preventDuplicates: true
                            });
                    }
                })
            } else {                                                // Usuario não existe
                this.toastrService.show('Conta nao encontrada!', 'Erro!',
                    {
                        status: 'danger',
                        position: <any>'top-right',
                        duration: <any>'3000',
                        preventDuplicates: true
                    });
            }
        })
    }

    logout() {
        this.userLoggedIn = null;
        this.router.navigate(['login']);
    }

    public refecthUser() {
        if (this.userLoggedIn != null) {
            this.userService.getUser(this.userLoggedIn.usuName).then(user => {
                this.userLoggedIn = user;
            })
        }
    }

    public currentUser(): User {
        return this.userLoggedIn;
    }

    public currentUserName(): string {
        return this.userLoggedIn.usuName;
    }


    public isAuthenticated(): boolean {
        return this.userLoggedIn != null;
    }

    canActivate(): Observable<boolean> | boolean {
        return this.isAuthenticated();
    }

    public async digestMessage(message) {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  public autoLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit() {

  }

  public login(){
    this.authService.login(this.username, this.password);
  }

}

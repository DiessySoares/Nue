import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {}

  deleteMyAccount(){
    this.userService.deleteUser(this.authService.currentUser().usuName);
    this.lougout();
  }

  lougout(){
    this.authService.logout();
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
  }

  inject(){
    this.getJSON().subscribe(user => {
      this.userService.updateUser(user);
    })
  }

}

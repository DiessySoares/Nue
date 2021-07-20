import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { User } from '../../../models/user';

import { Router } from '@angular/router';

import { AuthService } from './../../../service/auth/auth.service'
import { UserService } from './../../../service/user/user.service'


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [FormBuilder]
})


export class CreateAccountComponent implements OnInit {

  public newUser: User = {} as User;

  linearMode = true;
  @HostBinding('class')
  classes = 'example-items-rows';

  public createAccountForm: FormGroup;

  constructor(private formBuider: FormBuilder, private toastrService: NbToastrService, private authService: AuthService, private userService: UserService, private router: Router) { }


  private index: number = 0;


  showSuccessToast() {
    this.toastrService.show('Sua conta foi criada!',
      'Sucesso!',
      {
        status: 'success',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  showErrorToast() {
    this.toastrService.show('Esse nome já foi usado!',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  ngOnInit() {
    console.log(1)
    this.initValidator();
  }

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  public initValidator() {

    this.createAccountForm = this.formBuider.group({
      validatorName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      validatorPassword: ['', Validators.compose([
        Validators.required
      ])],
      validatorEmail: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
    });
  }

  getInputStatus(formItem: string) {
    return this.createAccountForm.controls[formItem].dirty && this.createAccountForm.controls[formItem].invalid ? 'danger' : 'primary';
  }

  createAccount() {
    this.userService.getUser(this.newUser.usuName).then(user =>{
      if(user == null) {    // conta ainda nao existe
        this.userService.createUser(this.newUser);
        this.showSuccessToast();
        this.router.navigate(['login']);
      } else {              // conta já nao existe
        this.showErrorToast();
      }
    })
  }

}

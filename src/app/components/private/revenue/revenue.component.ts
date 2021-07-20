import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { convertToBoolProperty } from '@nebular/theme/components/helpers';
import { Revenue } from '../../../models/revenue';

import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
})
export class RevenueComponent implements OnInit {

  constructor(private toastrService: NbToastrService, private dialogService: NbDialogService, private formBuider: FormBuilder, private authService: AuthService, private userService: UserService) { }

  public isDelete = false;

  public revenueSelected: Revenue = {} as Revenue;
  public newRevenue: Revenue = {} as Revenue;

  public newRevenueForm: FormGroup;

  public revenueFromUser: Revenue[] = this.authService.currentUser()?.usuRevenue;

  ngOnInit() {
    this.initValidator();
  }

  open(dialog: TemplateRef<any>, revenue: Revenue, type: string) {
    this.isDelete = (type == "delete");
    this.revenueSelected = revenue;
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


  openCreate(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  public initValidator() {
    this.newRevenueForm = this.formBuider.group({
      validatorName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(16)
      ])],
      validatorDesc: ['', Validators.maxLength(255)],
      validatorValue: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^-?\\d*(\\.\\d+)?$")
      ])],
      validatorTimes: [''],
    });
  }

  public createRevenue() {

    this.newRevenue.createdAt = new Date;

    if (this.revenueFromUser == null) {
      this.newRevenue.rvnId = 1;
      this.revenueFromUser = [];
    } else {
      this.newRevenue.rvnId = this.revenueFromUser[this.revenueFromUser.length - 1].rvnId + 1;
    }

    this.revenueFromUser.push(this.newRevenue);

    this.authService.currentUser().usuRevenue = this.revenueFromUser;
    this.userService.updateUser(this.authService.currentUser());
    this.showSuccessToast('Receita criada com sucesso!');

    this.newRevenue = {} as Revenue;
  }

  public sumRevenue() {
    let total = 0;
    if (this.revenueFromUser != null) {
      this.revenueFromUser.forEach(revenue => {
        total += revenue.rvnValue;
      });
    }
    return total;
  }

  public deleteRevenue() {
    for (let index = 0; index < this.revenueFromUser.length; index++) {
      if (this.revenueFromUser[index].rvnId == this.revenueSelected.rvnId) {
        this.revenueFromUser.splice(index, 1);
        this.authService.currentUser().usuRevenue = this.revenueFromUser;
        this.userService.updateUser(this.authService.currentUser());
        this.showSuccessToast('Receita removida!')
        break;
      }
    }
  }

  getInputStatus(formItem: string) {
    return this.newRevenueForm.controls[formItem].dirty && this.newRevenueForm.controls[formItem].invalid ? 'danger' : 'primary';
  }

  showSuccessToast(string: string) {
    this.toastrService.show(string,
      'Sucesso!',
      {
        status: 'success',
        position: <any>'top-right',
        duration: <any>'3000'
      });
  }


}

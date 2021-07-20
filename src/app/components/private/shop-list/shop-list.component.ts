import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ItemSpent } from '../../../models/itemSpent';
import { AuthService } from '../../../service/auth/auth.service';
import { SpentService } from '../../../service/spent/spent.service';
import { UserService } from '../../../service/user/user.service';

import { Spent } from './../../../models/spent'

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {

  public defaultName = "shop-item"
  public index = 0;

  public shopList = {} as Spent;

  public actualValue: number = 0;
  private spentFromUser: Spent[] = this.authService.currentUser()?.usuSpent;

  public shopForm: FormGroup;

  constructor(private spentService: SpentService, private toastrService: NbToastrService, private dialogService: NbDialogService, private formBuider: FormBuilder, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.shopList.sptItems = [] as ItemSpent[];
    this.initValidator();
  }

  insertShopItem() {
    if (this.actualValue > 0) {
      let item = {} as ItemSpent;

      item.ispName = this.defaultName + this.index + '-' + this.date(new Date);
      item.ispValue = this.actualValue;
      this.shopList.sptItems.push(item);
      this.actualValue = 0;
    }
  }

  sumAll() {
    let sum: number = 0;
    this.shopList.sptItems.forEach(item => {
      sum += item.ispValue;
    });
    return sum;
  }

  public initValidator() {
    this.shopForm = this.formBuider.group({
      validatorValue: [''],
    });
  }

  undo() {
    this.shopList.sptItems.pop();
  }

  salvar() {
    this.shopList.sptItems.forEach(item => {
      this.spentFromUser = this.spentService.insertItem(this.spentFromUser, item);
    });
    this.authService.currentUser().usuSpent = this.spentFromUser;
    this.userService.updateUser(this.authService.currentUser());
    this.showSuccessToast('Itens salvos!');

    this.reset();
  }

  reset() {
    this.shopList = {} as Spent;
    this.shopList.sptItems = [] as ItemSpent[];
    this.actualValue = 0;
    this.index = 0;
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


  date(dateIn) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    return String(dd + '/' + mm); // Leading zeros for mm and dd
  }


}

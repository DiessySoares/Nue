import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ItemSpent } from '../../../models/itemSpent';
import { Spent } from '../../../models/spent';

import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/user/user.service';
import { SpentService } from '../../../service/spent/spent.service';

@Component({
  selector: 'app-spent',
  templateUrl: './spent.component.html',
  styleUrls: ['./spent.component.scss'],
})
export class SpentComponent implements OnInit {

  constructor(private spentService: SpentService, private toastrService: NbToastrService, private dialogService: NbDialogService, private formBuider: FormBuilder, private authService: AuthService, private userService: UserService) { }

  public isDelete = false;

  public spentSelected: Spent = {} as Spent;
  public newSpent: Spent = {} as Spent;


  public itemSpentSelected: ItemSpent = {} as ItemSpent;
  public newItemSpent: ItemSpent = {} as ItemSpent;

  public newItemSpentForm: FormGroup;

  public spentFromUser: Spent[] = this.authService.currentUser()?.usuSpent;

  selectedItem = '2';

  ngOnInit() {
    this.initValidator();
  }

  open(dialog: TemplateRef<any>, item: ItemSpent, type: string) {
    this.isDelete = (type == "delete");
    this.itemSpentSelected = item;
    this.dialogService.open(dialog);
  }

  openCreate(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  public initValidator() {
    this.newItemSpentForm = this.formBuider.group({
      validatorName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(16)
      ])],
      validatorDesc: ['', Validators.maxLength(255)],
      validatorValue: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^-?\\d*(\\.\\d+)?$")
      ])],
      validatorEssential: [''],
      validatorInterval: [''],
    });
  }

  public sumSpent() {
    let total = 0;
    if (this.spentSelected?.sptItems != null) {
      this.spentSelected.sptItems.forEach(item => {
        total += item.ispValue;
      });
    }
    return total;
  }

  public createItemSpent() {
    this.spentFromUser = this.spentService.insertItem(this.spentFromUser, this.newItemSpent);
    this.authService.currentUser().usuSpent = this.spentFromUser;
    this.userService.updateUser(this.authService.currentUser());
    this.newItemSpent = {} as ItemSpent;
    this.newItemSpentForm.reset();
    this.showSuccessToast('Item criado!')
  }


  public deleteRevenue() {
    this.spentSelected = this.spentService.removeFromSpent(this.spentSelected, this.itemSpentSelected);
    this.spentFromUser = this.spentService.updateSpent(this.spentFromUser, this.spentSelected);


    this.authService.currentUser().usuSpent = this.spentFromUser;
    this.userService.updateUser(this.authService.currentUser());
    this.showSuccessToast('Item removido!')
  }

  getInputStatus(formItem: string) {
    return this.newItemSpentForm.controls[formItem].dirty && this.newItemSpentForm.controls[formItem].invalid ? 'danger' : 'primary';
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

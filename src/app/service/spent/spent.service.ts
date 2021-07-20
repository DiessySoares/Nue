import { Injectable } from '@angular/core';
import { ItemSpent } from '../../models/itemSpent';
import { Spent } from '../../models/spent';

@Injectable({
  providedIn: 'root'
})
export class SpentService {

  constructor() { }


  public insertItem(spent: Spent[], item: ItemSpent): Spent[] {

    let month = this.resetDays(new Date());
    item.createdAt = new Date();

    if (spent == null) { spent = [] as Spent[]; }

    // CASO 1: O MES REFERENTE JA EXISTE --------------------------------------
    for (let i = 0; i < spent.length; i++) {
      if (spent[i].sptMonth == month) {

        if (spent[i].sptItems == null) {
          spent[i].sptItems = [] as ItemSpent[];
          item.ispId = 1;
        } else {
          item.ispId = spent[i].sptItems[spent[i].sptItems.length - 1].ispId + 1;
        }

        spent[i].sptItems.push(item);
        return spent;
      }
    }
    //-------------------------------------------------------------------------

    // CASO 2: O MES REFERENTE NÃO EXISTE -------------------------------------
    let newspent = {} as Spent;

    newspent.sptMonth = month;
    newspent.sptDone = false;
    newspent.sptShop = false;

    newspent.sptItems = [] as ItemSpent[];
    item.ispId = 1;
    newspent.sptItems.push(item);

    spent.push(newspent);

    return spent;
    //-------------------------------------------------------------------------
  }

  public removeFromSpent(spent: Spent, item: ItemSpent): Spent {
    for (let i = 0; i < spent.sptItems.length; i++) {
      if (item.ispId == spent.sptItems[i].ispId) {
        spent.sptItems.splice(i, 1);
        return spent;
      }
    }
    return null;
  }

  public updateSpent(allSpent: Spent[], spent: Spent): Spent[] {
    for (let index = 0; index < allSpent.length; index++) {
      if (allSpent[index].sptMonth == spent.sptMonth) {
        allSpent[index] = spent;
        return allSpent;
      }
    }
    return null;
  }

  resetDays(d) {
    let yyyy = d.getFullYear().toString();
    let mm = (d.getMonth() + 101).toString().slice(-2);
    let dd = 1;
    return '0' + dd + '/' + mm + '/' + yyyy;
  }



}

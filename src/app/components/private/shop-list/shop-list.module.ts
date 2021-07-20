import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopListComponent } from './shop-list.component'
import { IonicModule } from '@ionic/angular';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class ShopListModule { }

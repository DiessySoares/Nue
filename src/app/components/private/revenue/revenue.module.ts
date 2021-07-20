import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueComponent } from './revenue.component'
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule } from '@nebular/theme';
import { IonicModule } from '@ionic/angular';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RevenueComponent
  ],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule,
    IonicModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NbEvaIconsModule,
    NbIconModule,
    NbButtonGroupModule,
    FormsModule,
    NbInputModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class RevenueModule { }

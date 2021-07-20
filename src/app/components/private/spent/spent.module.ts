import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpentComponent } from './spent.component'
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { IonicModule } from '@ionic/angular';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SpentComponent
  ],
  imports: [
    CommonModule,
    NbSelectModule,
    NbListModule,
    NbCardModule,
    IonicModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NbEvaIconsModule,
    NbIconModule,
    NbButtonGroupModule,
    NbCheckboxModule,
    NbToggleModule,
    FormsModule,
    NbInputModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class SpentModule { }

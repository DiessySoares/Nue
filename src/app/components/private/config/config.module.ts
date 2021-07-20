import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component'
import { NbButtonModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NbButtonModule
  ]
})
export class ConfigModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component'
import { NbCardModule, NbIconModule, NbListModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { IonicModule } from '@ionic/angular';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    IonicModule,
    NbSelectModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTabsetModule,
    NbListModule,
    HttpClientModule
  ]
})

export class HomeModule { }

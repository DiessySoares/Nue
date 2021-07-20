
// C O R E   M O D U L E S        --------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';

// UI   M O D U L E S             ---------------------------------------
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbIconModule,
  NbMenuModule,
  NbCardModule,
  NbUserModule,
  NbToastrModule,
  NbDialogModule
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// P U B L I C    M O D U L E S   ---------------------------------------
import { LoginModule } from './components/public/login/login.module'
import { CreateAccountModule } from './components/public/create-account/create-account.module'


// P R I V A T E    M O D U L E S ---------------------------------------
import { HomeModule } from './components/private/home/home.module'
import { RevenueModule } from './components/private/revenue/revenue.module'
import { ShopListModule } from './components/private/shop-list/shop-list.module'
import { SpentModule } from './components/private/spent/spent.module'
import { ConfigModule } from './components/private/config/config.module'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [

    //  A N G U L A R   ------------------------
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //  I O N I C       ------------------------
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),

    //  N E B U L A R   ------------------------
    NbCardModule,
    NbUserModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbMenuModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),

    // A P P            ------------------------
    CreateAccountModule,
    LoginModule,
    HomeModule,
    RevenueModule,
    ShopListModule,
    SpentModule,
    ConfigModule

  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }

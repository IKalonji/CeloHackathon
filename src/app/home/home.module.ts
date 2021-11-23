import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CashInComponent } from './cash-in/cash-in.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [HomePage,CashInComponent,]
})
export class HomePageModule {}

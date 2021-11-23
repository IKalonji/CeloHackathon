import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRScanner } from '@ionic-native/qr-scanner/ngx'
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

import { CashInComponent } from './cash-in/cash-in.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { FindAgentComponent } from './find-agent/find-agent.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [HomePage,CashInComponent,CashOutComponent, FindAgentComponent],
  providers: [QRScanner]
})
export class HomePageModule {}

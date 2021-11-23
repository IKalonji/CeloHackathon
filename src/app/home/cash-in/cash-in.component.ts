import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } 
        from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-profile',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.scss'],
})
export class CashInComponent implements OnInit {
  
  showQRCode = false;

  // We can have Canvas/Img/Url as elementType
  elementType = NgxQrcodeElementTypes.URL;
  
  // We can have High/Low/Medium/Quartile
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  // Need to specify the valid website address
  value : string = '';

  amount : string = '';

  constructor() { }

  ngOnInit() {}

  showQR(){
    let QRMetaData = {
      account: "this is the account agent needs to pay to",
      amount: this.amount 
    };

    this.value = JSON.stringify(QRMetaData);

    this.showQRCode = true;

  }

}

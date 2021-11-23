import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-cash-out',
  templateUrl: './cash-out.component.html',
  styleUrls: ['./cash-out.component.scss'],
})
export class CashOutComponent implements OnInit {

  constructor(private qrScanner: QRScanner) { } //

  ngOnInit() {
    this.scanner()
  }

  scanner(){
    this.qrScanner.prepare().then((status:QRScannerStatus) => {
      if (status.authorized){
        this.qrScanner.show();
        document.getElementsByTagName("body")[0].style.opacity="0.5";
        this.qrScanner.scan().subscribe((val) => {
          alert(val);
          document.getElementsByTagName("body")[0].style.opacity="1";
        })
      }

      else if (status.denied){

        //redirect user to settings to allow

      }

      else {

        //redirect user to settings to allow
        
      } 
    })
  }
}

/*


*/
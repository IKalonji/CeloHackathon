import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomePageCards } from '../models/home-cards.models';
import { CashInComponent } from './cash-in/cash-in.component';
import { CashOutComponent } from './cash-out/cash-out.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  optionCardsFirstRow = HomePageCards.slice(0,3);
  optionCardsSecondRow = HomePageCards.slice(3,6);
  optionCardsThirdRow = HomePageCards.slice(6);
  
  cardRows = [this.optionCardsFirstRow, this.optionCardsSecondRow, this.optionCardsThirdRow]

  constructor(
    private modalController: ModalController
  ) {}

  onClick(id:string){
    
    let component;
    switch(id){
      case "cashin":
        component = CashInComponent;
        break;
      case "cashout":
        component = CashOutComponent;
        break;
    }

    this.displayModal({component: component})

  }



  async displayModal(row:any){

    const account = await this.modalController.create(
      {
        component: row.component,
        showBackdrop: true,
        cssClass: "my-custom-modal-css",
        backdropDismiss: true,
        swipeToClose: true
      }
    );
    return await account.present()
  }

}

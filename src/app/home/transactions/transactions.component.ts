import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  transactions = Transactions;

  constructor() { }

  ngOnInit() {}

}

export const Transactions = [
  {
    date: "12/01/2021",
    type: "Cash in",
    wallet: "sgvdhfrghfjgjgjgj",
    txID: "12345",
    amount: "cZAR 50"
  },
  {
    date: "12/01/2021",
    type: "Cash out",
    wallet: "sgvdhfrghfjgjgjgj",
    txID: "12345",
    amount: "cZAR 50"
  },
  {
    date: "12/01/2021",
    type: "Cash in",
    wallet: "sgvdhfrghfjgjgjgj",
    txID: "12345",
    amount: "cZAR 50"
  },
  {
    date: "12/01/2021",
    type: "Cash out",
    wallet: "sgvdhfrghfjgjgjgj",
    txID: "12345",
    amount: "cZAR 50"
  },
]

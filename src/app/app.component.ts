import { Component } from '@angular/core';

export interface Transaction {
  credit: string;
  debit:string;
  amount:number;
  description: string;
  date: Date;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Boop De deoop';
  debit = [
    'Cash',
    'Accounts Receivable',
    'Maintenance',
    'Service Fees',
  ];
  credit = [
    'Revenue',
    'Accounts Payable',
    'Owner\'s Equity',
  ];
  transactions: Transaction[];

  accounts: string[];
  balances: {[s: string]: number} = {};
  now = Date.now();

  constructor() {
    this.accounts = [...this.debit,...this.credit];
    this.accounts.map(key => this.balances[key] = 0);
    //this.transactions = JSON.parse(localStorage['transactionCache'] || '[]');
    this.transactions = [];
    for(let transaction of this.transactions) {
      this.addTransaction(transaction);
    }
  }

  create(debit: string, credit: string, description: string, amount: number, date: Date) {
    this.addTransaction({debit: debit, credit: credit, amount: amount, description: description, date: date});
        //localStorage['transactionCache'] = JSON.stringify(this.transactions);
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
     if(this.debit.indexOf(transaction.debit) !== -1) {
        this.balances[transaction.debit] += transaction.amount;
      } else {
        this.balances[transaction.debit] -= transaction.amount;
      }
      if(this.credit.indexOf(transaction.credit) !== -1) {
        this.balances[transaction.credit] += transaction.amount;
      } else {
        this.balances[transaction.credit] -= transaction.amount;
      }


  }


}

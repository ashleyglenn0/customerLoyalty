import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { Purchases } from '../app/purchases/purchases.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CustomerService{
  customers: Customer [] = [];
  purchases: Purchases [] = [];

  constructor(private db: AngularFirestore){
    
  }

  createCustomer(firstName: string, lastName: string, loyaltyPoints: number, purchases: any = []): number{
    const customer: Customer = new Customer(firstName, lastName, loyaltyPoints, purchases);
    this.customers.push(customer);
    return customer.customerId;
  }

  getCustomerById(id: number): Customer | undefined {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].customerId === id){
        return this.customers[i];
      }
    }
    return undefined;
  }

  createPurchases(date: string, description: string, amount: number, customer: Customer): any{
    const purchases: Purchases = new Purchases (date, amount, description);
    this.purchases.push(purchases);
    return purchases;

  }

  saveCustomer(customer: Customer, uid: string){
    return this.db.collection(`Stores/${uid}/customers`).add(customer.toJson());
  }
    
}
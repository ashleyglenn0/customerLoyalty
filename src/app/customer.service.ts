import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { Purchases } from '../app/purchases/purchases.model';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class CustomerService{
  customer!: Customer;
  purchase!: Purchases;
  customers: Customer [] = [];
  purchases: Purchases [] = [];

  constructor(private db: AngularFirestore){
 
    
  }

 
  

  getCustomerById(id: number): Customer | undefined {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].customerId === id){
        return this.customers[i];
      }
    }
    return undefined;
    
  }

  createCustomer(username: string): number{
    const customer: Customer = new Customer(username, 0, this.purchases);
    this.customers.push(customer);
    return customer.customerId;
  }
  getLoyaltyPoints(purchaseAmount: number):number{
    let loyaltyPointsOver100 = 0;
    let loyaltyPointsOver50 = 0;
    let totalLoyaltyPointsEarned = 0;
    if(purchaseAmount > 100){
      loyaltyPointsOver100 = (purchaseAmount - 100 ) * 2;
      loyaltyPointsOver50 = 50;
      totalLoyaltyPointsEarned = loyaltyPointsOver100 + loyaltyPointsOver50;
      return totalLoyaltyPointsEarned;
    } else if (purchaseAmount > 50){
      loyaltyPointsOver50 = (purchaseAmount - 50) * 1;
      totalLoyaltyPointsEarned = loyaltyPointsOver50;
      return totalLoyaltyPointsEarned;
    } else{
      totalLoyaltyPointsEarned;
      return totalLoyaltyPointsEarned;
    }

  }

  createPurchases(date: string, amount: number, description: string, loyaltyPoints: number, customer: Customer): any{
    const purchases: Purchases = new Purchases (date, amount, description,loyaltyPoints);
    this.purchases.push(purchases);
    return purchases;

  }

  

  saveCustomer(customer: Customer, uid: string){
    return this.db.collection(`Stores/${uid}/customers`).add(customer.toJson());
  }


    
}
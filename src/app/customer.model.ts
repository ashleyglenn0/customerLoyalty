import { Purchases } from '../app/purchases/purchases.model';

export class Customer{
    public customerId: number;
    public firstName: string;
    public lastName: string;
    public loyaltyPoints: number;
    public purchases: Purchases[];

    constructor(firstName: string, lastName: string, loyaltyPoints: number, purchases: Purchases[]){
        this.customerId = Date.now();
        this.firstName = firstName;
        this.lastName = lastName;
        this.loyaltyPoints = loyaltyPoints;
        this.purchases = purchases;
    }
}
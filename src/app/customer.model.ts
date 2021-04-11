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
    toJson(){
        let json = {
            firstName: this.firstName,
            lastName: this.lastName,
            loyaltyPoints: this.loyaltyPoints,
            purchases: [] as any
        }
        this.purchases.forEach(purchase => {
            json.purchases.push({
                date: purchase.date,
                amount: purchase.amount,
                description: purchase.description
            })
        })
        return json;
    }
}
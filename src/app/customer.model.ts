import { Purchases } from '../app/purchases/purchases.model';

export class Customer{
    public customerId: any;
    public username: string;
    public purchases: Purchases[];

    constructor(username: string, loyaltyPoints: number, purchases: Purchases[]){
        this.customerId = Date.now();
        this.username = username;
        this.purchases = purchases;
    }
    toJson(){
        let json = {
            username: this.username,
            purchases: [] as any
        }
        this.purchases.forEach(purchase => {
            json.purchases.push({
                date: purchase.date,
                amount: purchase.amount,
                description: purchase.description,
                loyaltyPoints: purchase.loyaltyPoints
            })
        })
        return json;
    }
}
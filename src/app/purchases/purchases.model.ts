export class Purchases{
    public date: string;
    public amount: number;
    public description: string;
    public loyaltyPoints: number;

    constructor( date: string, amount: number, description: string, loyaltyPoints: number){
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.loyaltyPoints = loyaltyPoints;
    }
}
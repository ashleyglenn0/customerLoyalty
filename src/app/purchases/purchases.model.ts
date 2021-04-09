export class Purchases{
    public date: string;
    public amount: number;
    public description: string;

    constructor( date: string, amount: number, description: string){
        this.date = date;
        this.amount = amount;
        this.description = description;
    }
}
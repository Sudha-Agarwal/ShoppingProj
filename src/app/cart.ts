export class Cart {    
    Username:string;
    SKU:string;
    Price:number;
    Quantity:number;
    Name:string

    constructor(Username:string,SKU:string,Quantity:number,Price:number,Name:string){
        this.Username = Username;
        this.SKU = SKU;
        this.Quantity = Quantity;
        this.Price = Price;
        this.Name = Name;
    }

}

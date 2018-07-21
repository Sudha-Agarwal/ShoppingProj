export class Order {
    OrderId:string;
    Username:string;   
    TotalPrice:number;
    OrderDate:string;

    constructor( OrderId:string,
    Username:string,   
    TotalPrice:number,
    OrderDate:string){
        this.OrderDate  = OrderId;
        this.Username = Username;
        this.TotalPrice = TotalPrice;
        this.OrderDate = OrderDate;
    }


}

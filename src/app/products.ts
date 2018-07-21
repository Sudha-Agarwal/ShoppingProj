export class Products {
    SKU:String;
    Type:String;
    Category:String;
    Name:String;
    Price:number;
    imgPath:String

    constructor(SKU1:String,
    Type:String,
    Category:String,
    Name:String,
    Price:number,imgPath:String){

    this.SKU = SKU1;
    this.Type = Type;
    this.Category = Category;
    this.Name = Name;
    this.Price = Price;
    this.imgPath = imgPath;

    }
}

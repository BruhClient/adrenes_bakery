export interface SimplifiedProduct { 
    categoryName : string , 
    thumbnail : string , 
    _id : string, 
   
    price : number , 
    name : string , 
    slug :string , 
    description : string ,
    price_id : string , 


}
export interface Product { 
    categoryName : string , 
    images : string[] , 
    _id : string, 
    description : string, 
    price : number , 
    name : string , 
    slug :string , 
    price_id : string , 
    recommendedProducts : SimplifiedProduct[]

}
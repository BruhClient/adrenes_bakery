"use client"

import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import {  ShoppingCart } from "lucide-react";

import { useShoppingCart } from "use-shopping-cart";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
   
    className? : string , 
    name : string , 
    description : string , 
    currency : string , 
    price : number , 
    image : string , 
    price_id : string
}
 
const AddToCartButton: FunctionComponent<AddToCartButtonProps> = ({name,description,currency,price,image,price_id,className}) => {

    const product = {

        name: name,
        description: description,
        price: price,
        currency: currency,
        image: image,
        price_id: price_id,
      };

    const {addItem,handleCartClick} = useShoppingCart()
    
    


    return ( <Button className={cn(className)} onClick={() => {
        
        addItem(product)
        handleCartClick()
    }}><ShoppingCart/>Add to Cart</Button> );
}
 
export default AddToCartButton;
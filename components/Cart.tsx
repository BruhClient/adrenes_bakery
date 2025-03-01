"use client"
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";

function Cart() {
    const {handleCartClick} = useShoppingCart()

    return ( <Button variant={"outline"} size={"icon"} onClick={() => handleCartClick()}><ShoppingBag /></Button> );
}

export default Cart;
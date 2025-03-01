"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { toast } from "sonner";
import { useShoppingCart } from "use-shopping-cart";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import { createCheckout } from "@/actions/create-checkout";


export default function ShoppingCartModal() {


  const [requiresDelivery,setRequiresDelivery] = useState(false)

  const [deliveryFee,setDeliveryFee] = useState(0)
 
  
  const {data : session} = useSession()
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    incrementItem, 
    decrementItem,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => {
    
    if (requiresDelivery) { 
      if (cartCount! >= 8) { 
        setDeliveryFee(0)
        return
      }
      setDeliveryFee(8)
    } else { 
      setDeliveryFee(0)
    }
    
  },[requiresDelivery,cartCount])


  async function handleCheckoutClick(event: any) {
    
    event.preventDefault();

    if (cartCount! <= 0) { 
      return
    }
    if (!session) { 
      handleCartClick()
      return toast("Please log in to check out",)
    }
    if ( requiresDelivery && (!session?.user.deliveryAddress || !session?.user.postalCode || !session?.user.phoneNumber) ) {
      handleCartClick() 
      toast("Please update your delivery information to enable delivery")
      return 
    }
    
    
    try {
     
      const session = await createCheckout(cartDetails,deliveryFee,requiresDelivery)
      
      if (!session) { 
        return
      }
      redirectToCheckout(session.id);
      
      
      
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price * entry.quantity}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center gap-2">
                          <Button size={"icon"} variant={"ghost"} onClick={() => decrementItem(entry.id)}><Minus/></Button>
                          <div className="text-lg">
                            {entry.quantity}
                          </div>
                          <Button size={"icon"} variant={"ghost"} onClick={() => incrementItem(entry.id)}><Plus/></Button>
                          </div>
                          

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

            <div className={`w-full justify-between ${requiresDelivery? "flex" : "hidden"}`}>
              Delivery fee
              <div>
                ${deliveryFee}
              </div>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice! + deliveryFee}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Taxes are calculated at checkout.
            </p> 
            

            <div className="flex flex-col">
              <div className="flex items-center gap-3 pt-2">
                <Checkbox checked={requiresDelivery} onCheckedChange={(check :boolean) => setRequiresDelivery(check )} /> Requires Delivery ? 
              </div>

              <div className={`${requiresDelivery && "hidden"} text-muted-foreground`}>
                Self collection will be at Westwood Ave Floravale Blk 232 #11-41 {`( 7am - 10pm )`}
              </div>

              
            </div>
            



            <div className="mt-6">
              <Button onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
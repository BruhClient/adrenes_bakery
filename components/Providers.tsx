"use client"

import { CartProvider } from "use-shopping-cart";
import { SessionProvider } from "next-auth/react";

function Providers({children} : {children : React.ReactNode}) {

    
    return ( <CartProvider 
        
        cartMode="checkout-session"
        stripe={process.env.NEXT_PUBLIC_STRIPE_KEY! as string}
        currency="USD"
        shouldPersist
        language="en-US"
    >
        <SessionProvider>
            {children}
        </SessionProvider>
        
    </CartProvider> );
}

export default Providers;
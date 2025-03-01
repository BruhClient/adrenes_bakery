"use server"

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";




export async function createCheckout(cartDetails : any ,deliveryFee : number,requiresDelivery :boolean) { 
    const authSession = await auth()

    if (!authSession) { 
        return
    }
    const line_items = Object.values(cartDetails).map((item : any) => ({
        price_data: {
          currency: 'sgd',
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      }));

      if (requiresDelivery) {
        line_items.push({
          price_data: {
            currency: "sgd",
            product_data: { name: "Delivery Fee" },
            unit_amount: deliveryFee * 100, // Fixed fee in cents
          },
          quantity: 1,
        });
      }
      try { 
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          customer_email : authSession.user.email ?? "",
          metadata : {
              userId : authSession.user.id ?? ""
          },
          success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/stripe/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/stripe/error`,
          
          
        });
        return session
      } catch ( error ) { 
        console.log(error)
        return
      }
      

      
}
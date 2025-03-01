import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req : Request) { 
    const body = await req.text() ; 
    const signature = (await headers()).get("Stripe-Signature") as string

    let event: Stripe.Event; 
    try { 
        event = stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECERT!)
    } catch (error) { 
        return new NextResponse("invalid signature",{status : 400})
    }

    const session = event.data.object as Stripe.Checkout.Session
    try { 
        if (event.type === "checkout.session.completed") { 
            const simplifiedSession = await stripe.checkout.sessions.retrieve(
                session.id , 
                {
                    expand : ["line_items"]
                }
            )
           const {customer_email,line_items,amount_total} = simplifiedSession
            let requiresDelivery = false 
            const items = line_items?.data.map(({description,currency,quantity,price,amount_total}) => { 
                if (description === "Delivery Fee") { 
                    requiresDelivery = true 
                    return { 
                        name : description , 
                        currency , 
                        total : amount_total  / 100, 
                        quantity : undefined, 
                        price : undefined , 

                    }
                    
                } else { 
                    return { 
                        name :description, 
                        currency, 
                        quantity, 
                        price : price?.unit_amount! / 100, 
                        total : amount_total  / 100, 
        
                    }
                }
                
            }) as {
                name : string , 
                currency : string , 
                quantity : number , 
                price : number , 
                total : number 
            } []
            
    
            const user = await prisma.user.findUnique({ 
                where : { 
                    email : customer_email ?? ""
                }
            })
    
            if (!user) { 
                return new NextResponse("User cant be found ",{status : 401})
            }

            if (!requiresDelivery) { 

           
                await prisma.order.create({ 
                    data :{ 
                        userId : user.id, 
                        items,
                        total : amount_total! /100,
                        
                        
                        
                        
                        
                    }
                })
            } else{ 
                await prisma.order.create({ 
                    data :{ 
                        userId : user.id, 
                        items,
                        requiresDelivery , 
                        total : amount_total! /100, 
                        postalCode : user.postalCode , 
                        phoneNumber : user.phoneNumber, 
                        deliveryAddress : user.deliveryAddress, 
    
                    }
                })
            }
            
    
        }
        return new NextResponse("Success")
    } catch { 
        return new NextResponse("Error",{status : 404})
    }
    
}
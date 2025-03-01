"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DeliveryPayload, DeliverySchema } from "@/schema/delivery"

export const saveDeliveryInfo = async (values : DeliveryPayload) => { 

    try { 
        const {address,postalCode,phoneNumber} = DeliverySchema.parse(values)
        const session = await auth()
    
        if (!session) { 
            return {
                error : "Unauthorized"
            }
        }
        await prisma.user.update({ 
            where : { 
                email : session.user.email as string
            }, 
            data : { 
                deliveryAddress : address , 
                postalCode , 
                phoneNumber
            }
        })
        return { 
            success : "Credentials Updated"
        } 
    } catch { 
        return {
            error : "Something went wrong"
        }
    }
    
}
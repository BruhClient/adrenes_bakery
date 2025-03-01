"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const setOrderStatus  = async (status : "success" | "pending",orderId : string) => { 

    try { 
        
    
        await prisma.order.update({ 
            where : { 
                id : orderId
            },
            data : { 
               isCompleted : status === "success" ? false : true
            }
        })


        revalidatePath("/admin")
        return { 
            success : "Order Updated"
        } 
    } catch { 
        return {
            error : "Something went wrong"
        }
    }
    
}
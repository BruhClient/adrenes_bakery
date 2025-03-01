import { UserRole } from "@prisma/client"
import { DefaultSession } from "next-auth"

export type  ExtendedUser = DefaultSession["user"] & { 
    role : UserRole, 
    deliveryAddress : string , 
    postalCode : string , 
    phoneNumber : string ,
    image : string, 
    
    
}

declare module "next-auth" { 
    interface Session {
        user : ExtendedUser
    }
}
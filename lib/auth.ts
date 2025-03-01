import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

import authconfig from "./authconfig"
import { UserRole } from "@prisma/client"
 
export const { handlers : {GET,POST}, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session : {strategy : "jwt"}, 
  callbacks : { 
    async jwt({token}) { 
      if(!token) { 
        return token
      }
      const user = await prisma.user.findUnique({ 
        where : { 
          email : token.email as string 
        }
      })

      if (!user) { 
        return token
      }
     
      return { 
        id : user.id, 
        email : user.email, 
        deliveryAddress : user.deliveryAddress, 
        postalCode : user.postalCode , 
        phoneNumber : user.phoneNumber, 
        image : user.image , 
        role : user.role

      }
    }, 
    async session({token,session}) { 
      if (token) { 
        session.user.deliveryAddress = token.deliveryAddress as string , 
        session.user.postalCode = token.postalCode as string 
        session.user.phoneNumber = token.phoneNumber as string 
        session.user.image = token.image as string 
        session.user.id = token.id as string 
        session.user.role = token.role as UserRole
      }
      return session
    }
    
  },
  ...authconfig,
  
})


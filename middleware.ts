
import NextAuth from "next-auth"
import authconfig from "./lib/authconfig"
import { DEFAULT_LOGIN_REDIRECT, ProtectedRoutes } from "./routes"





const {auth} = NextAuth(authconfig)

export default auth((req) => { 
    const {nextUrl} = req

    const isLoggedIn = !!req.auth

    


    let isProtectedRoute = false 
    for (let i = 0 ; i < ProtectedRoutes.length ; i ++) { 
        if (nextUrl.pathname.includes(ProtectedRoutes[i])) { 
            isProtectedRoute = true 
            break
        }
    }

    

    if (isProtectedRoute) { 
        if (!isLoggedIn) { 
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return 
    }
    return 

})  

export const config = { 
    matcher : ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"]
}
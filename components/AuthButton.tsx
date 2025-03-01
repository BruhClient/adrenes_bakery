"use client"

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import UserProfile from "./UserProfile";


function AuthButton() {

    const {data : session} = useSession()
    
    async function OauthLogin(provider : "facebook" | "google") { 
        await signIn(provider, {
            redirectTo : "/" , 
            redirect : true , 
        })
    }
    if (!session) { 
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Log in</Button>
                </DialogTrigger>
                <DialogContent className="text-center">
                    <DialogTitle >Sign in</DialogTitle>
                    <DialogDescription>Sign in is required for checkout</DialogDescription>
                    <Button variant={"outline"} onClick={() => OauthLogin("google")}><FcGoogle  /> Sign in with Google </Button>
                    <Button variant={"outline"} onClick={() => OauthLogin("facebook")}><FaFacebook  /> Sign in with Facebook </Button>
                </DialogContent>
            </Dialog>
        )
    }
    return ( <UserProfile />);
}

export default AuthButton;
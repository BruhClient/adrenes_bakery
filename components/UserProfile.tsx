"use client"

import { signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import DeliveryInfoForm from "./DeliveryInfoForm";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";


function UserProfile() {

    const {data : session,update} = useSession()
    const router = useRouter()
   
    return ( <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={session?.user?.image ?? ""} alt="Profile"></AvatarImage>
                <AvatarFallback><User /></AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-3">
        
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(`/orders/${session?.user.id}`)}>
            Past Orders
          </DropdownMenuItem>
          
            <Dialog>
              <DialogTrigger className="w-full" asChild>
                <DropdownMenuItem className="w-full" onSelect={(e) => e.preventDefault()}>Delivery Infomation</DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Delivery Infomation</DialogTitle>
                <DialogDescription>Address must be in Singapore</DialogDescription>
                <DeliveryInfoForm update={update} initalPhoneNumber={session?.user.phoneNumber} initialAddress={session?.user.deliveryAddress} initialPostalCode={session?.user.postalCode}/>
              </DialogContent>
            </Dialog>
            {session?.user.role === UserRole.ADMIN && 
            <DropdownMenuItem onClick={() => router.push(`/admin`)}>
            Admin Dashboard
          </DropdownMenuItem>}
            
            
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
        </DropdownMenuContent>
        
    </DropdownMenu> );
}

export default UserProfile;
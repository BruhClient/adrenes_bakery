"use client"
import { Button } from "@/components/ui/button";
import { Laugh } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function SuccessPage() {

    const {data : session} = useSession()
    return ( <div className="h-[90vh] w-full flex justify-center items-center">
        <div className="flex justify-center flex-col items-center gap-3 text-center">
            
            <div className="text-3xl flex items-center gap-3">Order <span className="text-green-400">Complete</span><Laugh size={30} /></div>
            <p className="text-lg">
                Your order has been saved . Thank you for supporting local businesses !
            </p>
            <Button variant={"link"}><Link href={`/orders/${session?.user.id}`}>View your orders</Link></Button>
            <Button variant={"link"}><Link href={"/"}>Back to home page</Link></Button>
        </div>
    </div> );
}

export default SuccessPage;
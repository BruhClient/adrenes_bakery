"use client"
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Link from "next/link";

function ErrorPage() {

    
    return ( <div className="h-[90vh] w-full flex justify-center items-center">
        <div className="flex justify-center flex-col items-center gap-3 text-center">
            
            <div className="text-3xl flex items-center gap-3">Checkout failed <CircleX className="text-secondary" /></div>
            <p className="text-lg">
                Your cart has been saved . Please try again .
            </p>
            <Button variant={"link"}><Link href={"/"}>Back to home page</Link></Button>
        </div>
    </div> );
}

export default ErrorPage;
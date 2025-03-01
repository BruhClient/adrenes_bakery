"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function ContactusButton() {
    const router = useRouter()
    return ( <Button variant={"secondary"} onClick={() => router.push("/contact-us")} >Contact us</Button> );
}

export default ContactusButton;
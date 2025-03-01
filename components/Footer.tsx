import { Button } from "./ui/button";
import { Facebook, Instagram } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";


function Footer() {
    return ( <footer className="w-full h-[200px] bg-secondary flex items-center justify-center flex-col mt-10">
        <div className="flex gap-2">
            <Button size={"icon"} variant={"outline"} ><Link href={""}><Instagram/></Link></Button>
            <Button size={"icon"} variant={"outline"} ><Link href={""}><FaWhatsapp/></Link></Button>
            <Button size={"icon"} variant={"outline"} ><Link href={""}><Facebook/></Link></Button>
            <Button size={"icon"} variant={"outline"} ><Link href={""}><FaTelegram/></Link></Button>
            
        </div>

        <div className="flex font-bold flex-col">
            
            <Button variant={"link"}><Link href={""}>Privacy</Link></Button>
            <Button variant={"link"}><Link href={""}>Feedback</Link></Button>
            <Button variant={"link"}><Link href={""}>Terms and conditions</Link></Button>
        </div>

        <div className="text-sm">
            Adrene's Bakery | All rights reserved
        </div>
</footer> );
}

export default Footer;
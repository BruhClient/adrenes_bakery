"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";



const paths = [ 
    { 
        link : "/" , 
        name : "Home"
    },
    { 
        link : "/products/all" , 
        name : "Products"
    },
    
    { 
        link : "/contact-us" , 
        name : "Contact us"
    }
]


function Navbar() {
    const pathname = usePathname()
    
    return ( <div className="px-2 py-3 flex w-full items-center justify-between">
        <div className="flex gap-2">
            {
                paths.map((path) => <Button key={path.link} variant={"link"} className={`md:text-xl text-md ${pathname === path.link && "text-secondary"}`} ><Link href={path.link}>{path.name}</Link></Button> )
            }

        </div>
        
  
        
   
    </div> );
}

export default Navbar;
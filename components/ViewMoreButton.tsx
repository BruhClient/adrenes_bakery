"use client"

import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ViewMoreButtonProps {
    slug : string , 

}
 
const ViewMoreButton: FunctionComponent<ViewMoreButtonProps> = ({slug}) => {

    const router = useRouter()
    return ( <Button variant={"outline"} onClick={() => router.push(`/product/${slug}`)}>View more</Button> );
}
 
export default ViewMoreButton;
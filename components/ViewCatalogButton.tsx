"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function ViewCatalogButton() {
    const router = useRouter()
    return ( <Button variant={"outline"} className="text-lg" onClick={() => router.push("/products/all")}>View Catalog</Button> );
}

export default ViewCatalogButton;
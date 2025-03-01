import Hero from "@/components/Hero";
import PromotionBanner from "@/components/PromotionBanner";
import Releases from "@/components/Releases";
import Reviews from "@/components/Reviews";
import { Suspense } from "react";


export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 px-2">
        <Hero />
        <PromotionBanner message="Free delivery for every 8 boxes bought" subText={'Per Location per order'}/>
        <Suspense>
          <Releases />
        </Suspense>
       
        <Reviews />
      
    </div>
  );
}

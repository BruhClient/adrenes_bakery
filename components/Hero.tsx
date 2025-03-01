

import { client, urlFor } from "@/lib/sanity";

import Image from "next/image";
import { Button } from "./ui/button";
import ViewCatalogButton from "./ViewCatalogButton";
import ContactusButton from "./ContactUsButton";


async function getData() { 
    const query = `*[_type == "hero"][0] {
  "image1" : image1.asset._ref,
  "image2" : image2.asset._ref
}`
    const data = await client.fetch(query);

  return data;
}
async function Hero() {

    const data = await getData()

 
    return ( <div className="h-[600px] w-full   ">
        
        {/* Mobile Hero  */}
       
        <div className="xl:hidden w-full h-full flex justify-center items-center text-center flex-col px-3  ">
                    <div className="flex flex-col ">

                        <h1 className="font-bold text-[50px] md:text-[70px] leading-tight ">Adrene's Bakery</h1>
                        <p className="font-glegoo text-[30px] md:text-[40px]    ">
                            Baked treats fit for any <span className="text-secondary">occasion</span>
                        </p>
                    </div>
                    <div className="flex gap-3 pt-3">
                        <ViewCatalogButton />
                        <ContactusButton />
                    </div>
        </div>
     
        

        {/* Desktop Hero  */}

      
            <div className="xl:flex hidden w-full h-full items-center px-20  ">
                
                {/* Label */}
                <div className="flex-1 flex justify-center ">
                    <div className="flex flex-col">

                    <h1 className="font-bold text-[80px] whitespace-nowrap">Adrene's Bakery</h1>
                    <p className="font-glegoo text-[50px] max-w-[500px] line-clamp-2">
                        Baked treats fit for any <span className="text-secondary">occasion</span>
                    </p>

                    <div className="flex gap-3 pt-3">
                        <ViewCatalogButton />
                        <ContactusButton />
                    </div>

                    </div>
                </div>
                


                <div className="mb-12 flex md:mb-16 ">
                <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                    <Image
                    src={urlFor(data.image1).url()}
                    alt="Great Photo"
                    className="h-full w-full object-cover object-center"
                    priority
                    width={300}
                    height={300}
                    />
                </div>

                <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                    <Image
                    src={urlFor(data.image2).url()}
                    alt="Great Photo"
                    className="h-full w-full object-cover object-center"
                    width={300}
                    height={300}
                    priority
                    />
                </div>
                </div>

                



                </div>
      
        
    </div> );
}

export default Hero;
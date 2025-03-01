import { client, urlFor } from "@/lib/sanity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Product } from "@/types/product";
import Image from "next/image";
import { Truck } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import Recommendations from "@/components/Recommendations";
export const dynamic = "force-dynamic";

async function getData(slug : string) { 
    const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id, 
          recommendedProducts[]-> { 
            _id, 
            price , 
            name , 
            "thumbnail" : images[0].asset -> url, 
            "categoryName" : category->name,
            "slug" : slug.current,
            price_id , 
            description , 

          }

      }`

    const data = await client.fetch(query)

    return data
}

async function ProductDetailPage({params} : {params : Promise<{slug : string}>}) {

    const slug = await (await params).slug
    
    const product = await getData(slug) as Product
    

    return ( <div className="flex py-4 flex-col justify-center items-center gap-9  min-h-[90vh] ">
        <div className="flex lg:gap-12 lg:flex-row flex-col px-3 gap-4">
                <Carousel className="h-fit max-w-[500px]">
                    <CarouselContent>
                        {product.images.map((image, index) => (
                        <CarouselItem key={index} className="w-full flex justify-center items-center">
                                <Image src={urlFor(image).url()} alt="product" objectFit="cover" width={500} height={500}/>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2" />
                    <CarouselNext className="absolute right-2"/>
                    
                </Carousel>
                <div className="flex flex-col  justify-center gap-4 text-xl max-w-[500px]">
                    <div className="text-secondary text">
                        {product.categoryName}
                    </div>
                    <div className="text-3xl">
                        {product.name}
                    </div>

                    <div className="font-semibold">
                        ${product.price}
                    </div>
                    <div>
                        Incl GST plus taxes 
                    </div>
                    <div className="flex items-center gap-2">
                        <Truck /> 1-4 day Delivery if required
                    </div>
                    <div>
                        <AddToCartButton name={product.name} currency="SGD" price_id={product.price_id} description={product.description} price={product.price} image={urlFor(product.images[0]).url()}  />
                    </div>
                    

                    <div className="lg:max-h-40 overflow-auto ">
                        {product.description}
                    </div>
                </div>
        </div>
        <Recommendations products={product.recommendedProducts}/>

                
    </div> );
}

export default ProductDetailPage;
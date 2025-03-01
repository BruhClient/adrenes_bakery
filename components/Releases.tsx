import { client } from "@/lib/sanity";
import { SimplifiedProduct } from "@/types/product";
import ProductCard from "./ProductCard";

async function getData() { 
    const query = `*[_type == "product"][0...4] | order(_createdAt desc) { 

        _id, 
        price , 
        name , 
        price_id ,
        description,
        "thumbnail" : images[0].asset -> url, 
        "categoryName" : category->name,
        "slug" : slug.current, 
    }`
    const data = await client.fetch(query);

  return data;
}

async function Releases() {

    const data = await getData() as SimplifiedProduct[]

   
    return ( <div className="w-full">

        
        <h1 className="text-center text-2xl flex flex-col items-center font-semibold">New Releases <div className="w-12 rounded-lg h-2 bg-secondary"/></h1>
        <div className="flex gap-3 flex-wrap w-full justify-center">
            {data.map((product) => { 
                return <ProductCard description={product.description} price_id={product.price_id} slug={product.slug} key={product._id} name={product.name} categoryName={product.categoryName} _id={product._id} price={product.price} thumbnail={product.thumbnail} />
            })}
        </div>
            
        
        
    </div> );
}

export default Releases;
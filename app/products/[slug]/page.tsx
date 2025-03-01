


import { Filters } from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import PromotionBanner from "@/components/PromotionBanner";
import { client } from "@/lib/sanity";
import { SimplifiedProduct } from "@/types/product";

export const dynamic = "force-dynamic";

function capitalizeFirstLetter(val : string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

async function getData(category:string) { 
    const formattedCategory = capitalizeFirstLetter(category)

    const query = `*[_type == "product" ${category != "all" ? `&& category->name == "${formattedCategory}"` : ""}] { 
        _id, 
        price , 
        name , 
        "thumbnail" : images[0].asset -> url, 
        "categoryName" : category->name,
        "slug" : slug.current, 
        description, 
        price_id
    }`

    

    const data = await client.fetch(query)

    return data
}


async function ProductPage({params} : {params : Promise<{slug :string} >}) {
 
    const slug = (await params).slug
    const products = await getData(slug) as SimplifiedProduct[]

    return ( <div className="flex flex-col w-full items-center gap-4 px-3">
        <PromotionBanner message="Free delivery for every 8 boxes bought" subText={'Per Location per order'}/>
    
            <Filters category={slug} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-fit gap-3">
                {products.map((product) => <ProductCard description={product.description} price_id={product.price_id}  slug={product.slug} key={product._id} name={product.name} categoryName={product.categoryName} _id={product._id} price={product.price} thumbnail={product.thumbnail} />)}
            </div>
    
        
    </div> );
}

export default ProductPage;
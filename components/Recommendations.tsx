
import { SimplifiedProduct } from "@/types/product";

import ProductCard from "./ProductCard";

async function Recommendations({products} : {products : SimplifiedProduct[] | null}) {

    

   
    return ( <div className="w-full">

        
      
        <div className="flex gap-3 flex-wrap w-full justify-center">
            {(products ?? []).map((product) => { 
                return <ProductCard price_id={product.price_id} description={product.description} slug={product.slug} key={product._id} name={product.name} categoryName={product.categoryName} _id={product._id} price={product.price} thumbnail={product.thumbnail} />
            })}
        </div>
            
        
        
    </div> );
}

export default Recommendations;
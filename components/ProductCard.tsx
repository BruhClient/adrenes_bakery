
import Image from "next/image";
import { FunctionComponent } from "react";
import AddToCartButton from "./AddToCartButton";
import ViewMoreButton from "./ViewMoreButton";

interface ProductCardProps {
    _id : string , 
    name : string , 
    categoryName : string , 
    price : number, 
    thumbnail : string, 
    slug : string ,
    description : string , 
    price_id : string

}
 
const ProductCard: FunctionComponent<ProductCardProps> = ({_id,name,categoryName,price,thumbnail,slug,description,price_id}) => {
    return ( <div className="flex flex-col shadow-lg gap-1  px-2 py-3">
        <Image className="rounded-lg" width={300} height={300} src={thumbnail} alt="thumbnail"/>
        <div className="flex tems-center text-xl w-full justify-between">
            <div >
                {name}
            </div>
            <div >
                ${price}
            </div>
        </div>
        <div className="text-secondary pb-2">
            {categoryName}
        </div>
        <div className="flex w-full gap-2" >
            <AddToCartButton name={name} price={price} image={thumbnail} description={description} price_id={price_id} currency="SGD"  className="flex-1"/>
            <ViewMoreButton slug={slug}/>
        </div>
        
        
        
        </div> );
}
 
export default ProductCard;
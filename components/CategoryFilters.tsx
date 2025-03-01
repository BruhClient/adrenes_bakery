"use client"


import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation";


import { FunctionComponent } from "react";

interface CategoryFiltersProps {
    categories : {name : string}[], 
    currentCategory : string
}
 
const CategoryFilters: FunctionComponent<CategoryFiltersProps> = ({categories,currentCategory}) => {
    const router = useRouter()
    
    
    return ( 
    <RadioGroup defaultValue={currentCategory.toLowerCase()} onValueChange={(value) => router.push(`/products/${value.toLowerCase()}`) } className="flex flex-wrap justify-center ">
            <div className="flex items-center space-x-2" key={0}>
            <RadioGroupItem value={"all"} id={`r0`} />
            <Label htmlFor={`r0`} className="text-lg">All</Label>
          </div>
        {categories.map((category,index) => {
            return <div className="flex items-center space-x-2" key={index + 1}>
            <RadioGroupItem value={category.name.toLowerCase()} id={`r${index + 1}`} />
            <Label htmlFor={`r${index + 1}`} className="text-lg">{category.name} </Label>
          </div>
        } )}
        
        
      </RadioGroup> );
}
 
export default CategoryFilters;


import { client } from "@/lib/sanity"
import CategoryFilters from "./CategoryFilters"

 
async function getData() { 
    const query = `*[_type == "category"] { 
    name
    }`

    const data = await client.fetch(query) 

    return data
}

export async function Filters({category} : {category : string}) {

  const data = await getData()

  
  return (
   
    <CategoryFilters categories={data} currentCategory={category}/>
  
    
  )
}
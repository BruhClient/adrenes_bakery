import { client } from "@/lib/sanity";
import ReviewCard from "./ReviewCard";

async function getData() { 
    const query = `*[_type == "review"] {
        _createdAt, 
        name , 
        description , 
        rating , 
        location ,  
    }`
    const data = await client.fetch(query);

  return data;
}


async function Reviews() {

    const data = await getData() as SimplifiedReview[]
    

    return ( <div className="flex flex-col gap-3 px-6 ">
        <h1 className="text-center text-2xl flex flex-col items-center font-semibold">Reviews <div className="w-12 rounded-lg h-2 bg-secondary"/></h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {data.map((review,index) => <ReviewCard key={index} name={review.name} rating={review.rating} description={review.description} location={review.location} _createdAt={review._createdAt}/>)}
        </div>
    </div> );
}

export default Reviews;
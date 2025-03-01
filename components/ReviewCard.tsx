"use client"

import { formatTimeToNow } from "@/lib/utils";
import { FunctionComponent } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Star } from "lucide-react";


interface ReviewCardProps {
    name : string , 
    description : string ,
    rating : number , 
    location : string, 
    _createdAt : Date
}
 
const ReviewCard: FunctionComponent<ReviewCardProps> = ({name ,description,rating,location,_createdAt}) => {
    return ( <Card className="p-4 text-lg flex flex-col gap-8 max-w-[500px] w-full">
        <CardTitle className="flex">
          {Array.from({ length: 5 }).map((data,index) => {

            if (index < rating) { 
                return <Star key={index} className="fill-yellow-400" />
            }
            return <Star key={index} />
           
          })}
        </CardTitle>

        <CardDescription className="text-lg flex-1 flex items-center ">
          {`" ${description} "`}
        </CardDescription>

        <div className="flex flex-col text-muted-foreground ">
            <div className="text-xl text-foreground ">
                {name} | {location}
            </div>
            
            <div>
            {formatTimeToNow(_createdAt)}
            </div>
        </div>
    </Card> );
}
 
export default ReviewCard;
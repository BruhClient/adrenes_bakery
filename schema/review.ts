import { z } from "zod";

export const reviewSchema = z.object({
    title : z.string().min(1,{message : "Title must be at least 1 character"}), 
    email : z.string().email(), 
    message : z.string(), 
    rating : z.number(), 

})

export type ReviewPayload = z.infer<typeof reviewSchema>
import {z} from "zod"


export const DeliverySchema = z.object({ 
    address : z.string().min(5,{message :"Please enter a valid address"}) , 
    phoneNumber : z.string().regex(/^\d+$/, "Must be a numeric").min(8,{message : "Phone number must be at least 8 characters"}).max(8,{message : "Phone number must be at most 8 characters"}), 
    postalCode : z.string().regex(/^\d+$/, "Must be a numeric").min(6,{message : "Postal code must be at least 8 characters"}).max(6,{message : "Postal code must be at most 8 characters"})
})

export type DeliveryPayload = z.infer<typeof DeliverySchema>

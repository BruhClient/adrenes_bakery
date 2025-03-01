import { defineField, defineType } from "sanity";

export default defineType({ 
    name : "contact", 
    type : "document", 
    title : "Contact" , 
    fields : [
        defineField({
            name : "address",
            title : "Address" , 
            type : "string" 


        }),
        defineField({
            name : "phone_number",
            title : "Phone Number" , 
            type : "string" 


        }),
        defineField({
            name : "email",
            title : "Email" , 
            type : "string" 


        }),
        
    ]
})
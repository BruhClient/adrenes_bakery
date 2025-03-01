import { defineField, defineType } from "sanity"

export default defineType({ 
    name : "review" ,
    type : "document" , 
    title : "Review" , 
    fields : [
        defineField({ 
            name : "name" , 
            type : "string" , 
            title : "Reviewer's name"
        }), 
        defineField({ 
            name : "rating" , 
            type : "number" , 
            title : "Rating"
        }), 
        defineField({ 
            name : "description" , 
            type : "string" , 
            title : "Description"
        }), 
        defineField({ 
            name : "location" , 
            type : "string" , 
            title : "Location"
        }), 
        
    ]
})
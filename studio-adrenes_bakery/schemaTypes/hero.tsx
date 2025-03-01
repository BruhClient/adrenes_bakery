import { defineField, defineType } from "sanity"

export default defineType({ 
    name : "hero" ,
    type : "document" , 
    title : "Hero Images" , 
    fields : [
        defineField({ 
            name : "image1" , 
            type : "image" , 
            title : "Image 1"
        }), 
        defineField({ 
            name : "image2" , 
            type : "image" , 
            title : "Image 2"
        }), 
    ]
})
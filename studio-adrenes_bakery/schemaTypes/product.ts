import { defineField, defineType } from "sanity";

export default defineType({ 
    name : "product", 
    title : "Product", 
    type  : "document" , 
    fields :[
        defineField({ 
            name : "name" , 
            title : "Product name" , 
            type : "string"
        }), 
        defineField({ 
            name : "price" , 
            title : "Price" , 
            type : "number"
        }), 
        defineField({ 
            name : "description" , 
            title : "Description" , 
            type : "string"
        }), 
        defineField({ 
            name : "slug" , 
            type : "slug", 
            title : "Product String" , 
            options : { 
                source : "name"
            }

        }), 
        defineField({ 
            name : "images" , 
            type : "array" , 
            title : "Product Images" , 
            of :[{type : "image"}]
        }),
        defineField({
            name  : "price_id", 
            title : "Stripe Price Id",
            type : "string",

        }), 
        defineField({ 
            name : "category" , 
            type : "reference", 
            title : "Category" , 
            to : [{type :"category"}]
        }), 
        defineField({ 
            name : "recommendedProducts" , 
            title : "Recommended Products" , 
            type : "array" , 
            of :[{type :"reference",to : {type : "product"}}]
        })
    ]
})
import OrderCard from "@/components/OrderCard";
import { prisma } from "@/lib/prisma";

 
const OrdersPage = async ({params} : {params : Promise<{slug :string}>}) => {
    const slug = (await params).slug
    
    const orders = await prisma.order.findMany({ 
        where : { 
            userId : slug 
        }, 
        orderBy : { 
            createdAt : "desc"
        }
    })

  
    return ( <div className="min-h-[90vh] flex gap-5 flex-col items-center px-3">
        <div className="text-2xl text-center font-bold">Past Orders</div>
        <div className="text-center">See something different ? Contact us !</div>
        <div className="max-w-[700px] flex flex-col gap-5 w-full">
            {orders.map((order,index) => <OrderCard key={index} order={order }/>)}
        </div>
        
    </div> );
}
 
export default OrdersPage;
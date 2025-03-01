import AdminDashboardButton from "@/components/admin/AdminDashboardButton";
import OrderCard from "@/components/OrderCard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Order, UserRole } from "@prisma/client";

 
const AdminOrderPage = async ({params} : {params : Promise<{slug :string}>}) => {
    const slug = (await params).slug
    const session = await auth()

    
    const order = await prisma.order.findUnique({ 
        where : { 
            id : slug 
        }
    }) as Order

    if (!session ||  session?.user.role === UserRole.USER) { 
        return <div>Unauthorized</div>
    }

    return ( <div className="min-h-[90vh] flex gap-5 flex-col items-center px-3 justify-center">
        
            <div className="max-w-[700px] w-full">
                <OrderCard order={order }/>
            </div>

            <AdminDashboardButton />
            
        
        
    </div> );
}
 
export default AdminOrderPage;
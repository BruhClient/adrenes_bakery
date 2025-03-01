import { columns, DataTable, Order } from "@/components/admin/data-table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

async function AdminPage() {

    const session = await auth()

    
    const orders = (await prisma.order.findMany({ 
        select : { 
            isCompleted : true , 
            total : true , 
            id : true , 
            
            user : {
                select : { 
                    email : true 
                }
            }  
        }, 
        orderBy : { 
            createdAt : "asc"
        }
    }) ).map((order) => { 
        return { 
            status : order.isCompleted ? "success":"pending", 
            id : order.id , 
            email : order.user.email, 
            total : order.total
        }
    }) as Order[]
    if (!session || session?.user.role === UserRole.USER) { 
        return <div>Unauthorized</div>
    }


    return ( <div className="flex justify-center items-center w-full min-h-[90vh] px-4">
        
        <DataTable columns={columns} data={orders}/>
        </div> );
}

export default AdminPage;
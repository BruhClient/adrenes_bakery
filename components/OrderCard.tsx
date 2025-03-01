import { Order } from "@prisma/client";
import { FunctionComponent } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card, CardDescription, CardTitle } from "./ui/card";
import { format } from "date-fns";

interface OrderCardProps {
    order : Order
}
 
const OrderCard: FunctionComponent<OrderCardProps> = ({order}) => {
   
    return ( <Card className="px-3 py-5 w-full">
        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
        
        <CardDescription className="pb-2 flex flex-col">
          <div>{format(new Date(order.createdAt), "MM/dd/yyyy',' h:mm a")}</div>
          <div>
            {order.requiresDelivery ? <div>Delivery to {order.deliveryAddress} {order.postalCode}</div> : <div className="text-secondary">Self Collection at Westwood Ave Blk 232 #11-41</div>}
          </div>
          <div>
            {order.phoneNumber}
          </div>
        </CardDescription>
        
       {order.isCompleted ? <div className="border-green-400 border-2 w-fit px-2 py-1 rounded-lg text-sm text-green-400">Received</div> : <div className="border-red-400 border-2 w-fit px-2 py-1 rounded-lg text-sm text-red-400">Pending</div>}
        <Table>
        
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(order.items as any[] ).map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className="text-right">${item.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${order.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </Card> );
}
 
export default OrderCard;
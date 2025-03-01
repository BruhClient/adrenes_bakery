import Link from "next/link";
import { Button } from "../ui/button";

 
const AdminDashboardButton = () => {
    return ( <Button variant={"link"}><Link href={"/admin"}>Back to admin page</Link></Button> );
}
 
export default AdminDashboardButton;
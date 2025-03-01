import AuthButton from "./AuthButton";
import Cart from "./Cart";

 
const UserButtons= () => {
    return ( <div className="fixed right-3 top-3 flex flex-col items-end gap-2">
       
        <Cart />
       <AuthButton /> 
    </div> );
}
 
export default UserButtons;
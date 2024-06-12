import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoutes = () => {
    const {user}=useSelector(store=>store.auth);
  return user&&user.isAdmin?<Outlet/>:<Navigate to="/login" replace/>
  
}
export default AdminPrivateRoutes
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const  PrivateRoutes = () => {
    const {user}=useSelector(store=>store.auth);
  return user ? <Outlet/>:<Navigate to='/login' replace/>
}
export default PrivateRoutes
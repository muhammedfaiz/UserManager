import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminHome from "./pages/admin/AdminHome";
import UserEditPage from "./pages/admin/UserEditPage";
import AdminPrivateRoutes from "./components/admin/AdminPrivateRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* protected routes */}
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="" element={<AdminPrivateRoutes />}>
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/admin/user-edit/:id" element={<UserEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;

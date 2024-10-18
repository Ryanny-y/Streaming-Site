import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";

const Layout = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default Layout;

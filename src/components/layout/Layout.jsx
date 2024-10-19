import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";
import ActionProvider from "../../context/ActionsContext";

const Layout = () => {
  return (
    <>
      <AuthProvider>
        <ActionProvider>
          <Header />
          <Outlet />
        </ActionProvider>
      </AuthProvider>
    </>
  );
};

export default Layout;

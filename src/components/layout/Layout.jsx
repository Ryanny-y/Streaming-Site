import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";
import ActionProvider from "../../context/ActionsContext";
import { useEffect, useState } from "react";

const Layout = () => {

  const [ message, setMessage ] = useState('');
  
  useEffect(() => {
    if(message) {
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }, [message, setMessage])

  return (
    <>
      <AuthProvider>
        <ActionProvider>
          <div className="relative">
            <Header />
            <Outlet context={setMessage}/>
            {/* Error Msg */}
            {message && <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl bg-black p-5 rounded-md">
              {message}
            </div>}
          </div>
        </ActionProvider>
      </AuthProvider>
    </>
  );
};

export default Layout;

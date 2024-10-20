import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";
import ActionProvider from "../../context/ActionsContext";
import { useEffect, useState } from "react";

const Layout = () => {

  const [ message, setMessage ] = useState('');
  const [ timeoutId, setTimeoutId ] = useState();

  useEffect(() => {
    if(message) {
      
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);

      setTimeoutId(id);
    }

    return () => clearTimeout(timeoutId);
  }, [message])

  return (
    <>
      <AuthProvider>
        <ActionProvider setMessage={setMessage}>
          <div className="relative">
            <Header />
            <Outlet context={setMessage}/>
            {/* Error Msg */}
            {message && <div className="text-white fixed top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl bg-black p-5 rounded-md">
              {message}
            </div>}
          </div>
        </ActionProvider>
      </AuthProvider>
    </>
  );
};

export default Layout;

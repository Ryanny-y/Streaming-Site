import { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const [ userData, setUserData ] = useState({});
  const [ accessToken, setAccessToken ] = useState('');

  const value = {
    userData, setUserData,
    accessToken, setAccessToken
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )

};

export default AuthProvider;
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface TokenContextType {
    token: string | null,
    setToken: (newToken: string) => void
}

const AuthContext = createContext<TokenContextType>({
    token: null,
    setToken: () => {}
});

const AuthProvider = ({ children }: any) => {  
  const [token, setToken_] = useState(localStorage.getItem("fake-token"));
  
  const setToken = (newToken: string) => {   
    setToken_(newToken);
  };

  useEffect(() => {    
    if (token) {
      localStorage.setItem("fake-token", token);
    } else {     
      localStorage.removeItem("fake-token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

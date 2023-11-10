import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isSignInActive, setIsSignInActive] = useState(true);

  const handleSignUpClick = () => {
    setIsSignInActive(false);
  };

  const handleSignInClick = () => {
    setIsSignInActive(true);
  };

  return (
    <authContext.Provider
      value={{
        setAuth,
        auth,
        isSignInActive,
        setIsSignInActive,
        handleSignInClick,
        handleSignUpClick,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export { useAuth, AuthProvider };

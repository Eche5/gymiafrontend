import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthenticationContext";
import useRefresherToken from "../hooks/useRefresherToken";
import { Outlet } from "react-router-dom";
function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefresherToken();

  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
}

export default PersistLogin;

import axios from "../api/axios";
import { useAuth } from "../contexts/AuthenticationContext";
function useRefresherToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const REFRESH_URL = "/users";

    const response = await axios.get(REFRESH_URL, { withCredentials: true });
    const accessToken = response?.data?.accessToken;
    const foundUser = response?.data?.data;

    setAuth((prev) => {
      return { ...prev, foundUser, accessToken };
    });
  };

  return refresh;
}

export default useRefresherToken;

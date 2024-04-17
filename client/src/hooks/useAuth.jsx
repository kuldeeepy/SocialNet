import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const isAuthenticated = () => {
      axios
        .get("http://localhost:2000/checkauth", {
          withCredentials: true,
        })
        .then((res) => {
          if (!res.status === 200) return;
          setIsLoggedIn(true);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    isAuthenticated();
  }, []);
  return { isLoggedIn, user };
};

export default useAuth;

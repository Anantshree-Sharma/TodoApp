import { useState } from "react";
import { UserContext } from "./useUser";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const res = await fetch(`${BASE_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await res.json();
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, loading, setLoading, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

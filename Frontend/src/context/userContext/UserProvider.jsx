import { useState } from "react";

import { UserContext } from "./useUser";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <UserContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

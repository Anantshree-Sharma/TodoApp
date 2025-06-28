import { createContext, useContext } from "react";

const UserContext = createContext();

const useUser = () => useContext(UserContext);

export { UserContext, useUser };

import { useUser } from "../context/userContext/useUser";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { isAuth } = useUser();

  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }
  return <>{children}</>;
}

export default Protected;

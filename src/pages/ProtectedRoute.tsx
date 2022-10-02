import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//TODO: fix types
//@ts-ignore
export const ProtectedRoute = ({ children }) => {
  //@ts-ignore
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

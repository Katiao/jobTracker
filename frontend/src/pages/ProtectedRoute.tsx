import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((store: RootState) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

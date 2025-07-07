import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

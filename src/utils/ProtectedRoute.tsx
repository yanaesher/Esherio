import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <LoadingSpinner />
      </div>
    );

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

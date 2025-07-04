import { Route, Routes } from "react-router";

import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { WelcomePage } from "./pages/WelcomePage";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Header } from "./components/Header";

export function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

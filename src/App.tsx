import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { WelcomePage } from "./pages/WelcomePage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthPage } from "../src/pages/AuthPage";

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

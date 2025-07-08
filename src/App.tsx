import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { WelcomePage } from "./pages/WelcomePage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthPage } from "../src/pages/AuthPage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { MessagesPage } from "./pages/MessagesPage";

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/messages/:id" element={<MessagesPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

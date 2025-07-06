import { useSearchParams } from "react-router-dom";
import { RegisterForm } from "../components/Form/RegisterForm";
import { LoginForm } from "../components/Form/LoginForm";

export function AuthPage() {
  const [params] = useSearchParams();

  const mode = params.get("mode");
  return (
    <main className="flex justify-center items-center min-h-screen bg-surface">
      <div className="container">
        {mode === "register" ? <RegisterForm /> : <LoginForm />}
      </div>
    </main>
  );
}

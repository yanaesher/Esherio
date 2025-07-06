import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useNavigate, Link } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { FormInputItem } from "./FormInputItem";

export function LoginForm() {
  const { signInWithEmail } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    try {
      const { user } = await signInWithEmail(email, password);
      navigate(`/profile/${user.id}`);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const { email, setEmail, password, setPassword, handleSubmitForm } =
    useAuthForm({ onSubmit });

  return (
    <div className="relative w-full max-w-md mx-auto">
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <LoadingSpinner />
        </div>
      )}

      <form
        onSubmit={handleSubmitForm}
        className="bg-white p-6 rounded-lg shadow-lg space-y-5 relative z-10"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Log In</h1>

        <FormInputItem
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <FormInputItem
          icon={<Lock className="w-5 h-5 text-gray-400" />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded transition duration-200"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/auth?mode=register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

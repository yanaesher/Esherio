import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthForm } from "../hooks/useAuthForm";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (email: string, password: string) => {
    await signInWithEmail(email, password);
    navigate("/profile");
  };

  const { email, setEmail, password, setPassword, errorMsg, handleSubmitForm } =
    useAuthForm({ onSubmit });

  return (
    <form
      onSubmit={handleSubmitForm}
      className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg space-y-5"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">Log In</h1>

      <div className="flex items-center border border-gray-300 rounded px-3">
        <Mail className="w-5 h-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center border border-gray-300 rounded px-3">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

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
  );
}

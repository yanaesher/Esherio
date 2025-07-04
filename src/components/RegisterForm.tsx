import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export function RegisterForm() {
  const { signUpWithEmail } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (email: string, password: string) => {
    const { message } = await signUpWithEmail(email, password);
    if (message) setSuccessMessage(message);
  };

  const { email, setEmail, password, setPassword, errorMsg, handleSubmitForm } =
    useAuthForm({ onSubmit });

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h1>

        <div className="flex items-center border border-gray-300 rounded px-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded px-3">
          <Lock className="w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        {successMessage && (
          <p className="text-green-600 text-sm text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded transition duration-200"
        >
          Join!
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth?mode=login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}

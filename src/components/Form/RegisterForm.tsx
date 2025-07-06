import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "../LoadingSpinner";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { FormInputItem } from "./FormInputItem";

export function RegisterForm() {
  const { signUpWithEmail } = useAuth();

  const onSubmit = async (
    email: string,
    password: string,
    nickname: string
  ) => {
    try {
      const { message } = await signUpWithEmail(nickname, email, password);
      return message;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return "Unknown error occurred during sign up";
    }
  };

  const {
    email,
    setEmail,
    password,
    setPassword,
    nickname,
    setNickname,
    handleSubmitForm,
    isLoading,
    error,
    successMessage,
  } = useRegisterForm({ onSubmit });

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
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h1>

        <FormInputItem
          icon={<User />}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
        />
        <FormInputItem
          icon={<Mail />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <FormInputItem
          icon={<Lock />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded transition duration-200"
        >
          Sign Up
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
    </div>
  );
}

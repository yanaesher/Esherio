import { useState } from "react";

type SubmitFn = (
  email: string,
  password: string,
  nickname: string
) => Promise<string | void>;

interface UseRegisterFormProps {
  onSubmit: SubmitFn;
}

export function useRegisterForm({ onSubmit }: UseRegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const message = await onSubmit(email, password, nickname);
      if (message) setSuccessMessage(message);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}

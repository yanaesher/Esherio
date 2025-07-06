import { useState, type FormEvent } from "react";

type AuthFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function useAuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmitForm,
  };
}

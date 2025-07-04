import { useState, type FormEvent } from "react";

type AuthFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function useAuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await onSubmit(email, password);
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
      else setErrorMsg("Unknown error occurred");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,

    handleSubmitForm,
  };
}

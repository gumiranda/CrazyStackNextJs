import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { useLoginLib, type SubmitLoginHandler } from "./login.lib";

export const useLogin = () => {
  const { login } = useAuth();
  const { handleSubmit, register, formState } = useLoginLib();
  const handleLogin: SubmitLoginHandler = async (data) => {
    await login(data);
  };
  return { handleSubmit, register, formState, handleLogin };
};

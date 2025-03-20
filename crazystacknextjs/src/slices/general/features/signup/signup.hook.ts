import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { useSignUpLib, type SubmitSignupHandler } from "./signup.lib";

export const useSignUp = () => {
  const { signup } = useAuth();
  const { handleSubmit, register, formState, ...formProps } = useSignUpLib();
  const handleSignUp: SubmitSignupHandler = async (data) => {
    await signup(data);
  };
  return { handleSubmit, register, formState, handleSignUp, formProps };
};

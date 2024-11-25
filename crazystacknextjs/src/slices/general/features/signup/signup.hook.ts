import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { useSignUpLib, type SubmitSignUpHandler } from "./signup.lib";

export const useSignUp = () => {
  const { signup } = useAuth();
  const { handleSubmit, register, formState, ...formProps } = useSignUpLib();
  const handleSignUp: SubmitSignUpHandler = async (data) => {
    await signup({
      ...data,
      passwordConfirmation: data.password,
    });
  };
  return { handleSubmit, register, formState, handleSignUp, formProps };
};

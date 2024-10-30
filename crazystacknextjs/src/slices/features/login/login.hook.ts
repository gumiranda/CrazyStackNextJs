import { useLoginLib, type SubmitLoginHandler } from "./login.lib";

export const useLogin = () => {
  const { handleSubmit, register, formState } = useLoginLib();
  const handleLogin: SubmitLoginHandler = (data) => {
    console.log(data);
    //await login(data);
  };
  return { handleSubmit, register, formState, handleLogin };
};

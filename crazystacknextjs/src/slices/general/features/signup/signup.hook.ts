import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { useSignUpLib, type SubmitSignUpHandler } from "./signup.lib";
import { useEffect } from "react";
import { getCurrentPosition } from "@/shared/libs/utils";

export const useSignUp = () => {
  const { signup } = useAuth();
  const { handleSubmit, register, formState, ...formProps } = useSignUpLib();
  useEffect(() => {
    getCurrentPosition()
      .then((position) => {
        const { lat, lng } = position;
        formProps?.setValue("coord", {
          type: "Point",
          coordinates: [lng, lat],
        });
      })
      .catch((error) => {
        console.error("Error getting location", error);
      });
  }, []);
  const handleSignUp: SubmitSignUpHandler = async (data) => {
    await signup(data);
  };
  return { handleSubmit, register, formState, handleSignUp, formProps };
};

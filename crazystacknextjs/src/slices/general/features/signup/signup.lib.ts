import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  phone: string;
}

export type SubmitSignUpHandler = SubmitHandler<SignUpFormData>;

export const signupSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não correspondem")
    .required("Confirmação de senha é obrigatória"),
  name: yup.string().required("Nome é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
});

export type YupSchema = yup.InferType<typeof signupSchema>;

export const useSignUpLib = () => {
  const formProps = useForm<SignUpFormData>({
    resolver: yupResolver(signupSchema),
  });
  return formProps;
};

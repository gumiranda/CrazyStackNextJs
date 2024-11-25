import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  parsePhoneNumberFromString,
  AsYouType,
  isValidPhoneNumber,
  CountryCode,
} from "libphonenumber-js";

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
  country: yup.object({
    code: yup.string().required("País é obrigatório"),
    phone: yup.string().required("DDD é obrigatório"),
  }),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("phone", "Telefone inválido", function (value) {
      const digitsOnly = value?.replace?.(/\D/g, "");
      const country = this.parent.country;
      const fullNumber = `+${country.phone}${digitsOnly}`;
      const isValid = isValidPhoneNumber(
        fullNumber,
        country.code as CountryCode,
      );
      return isValid;
    }),
});

export type YupSchema = yup.InferType<typeof signupSchema>;

export const useSignUpLib = () => {
  const formProps = useForm<SignUpFormData>({
    resolver: yupResolver(signupSchema),
  });
  return formProps;
};

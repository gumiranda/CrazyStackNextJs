import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";

export interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  phone: string;
  country: {
    code?: string;
    phone?: string;
  };
  coord: any;
}

export type SubmitSignupHandler = SubmitHandler<SignUpFormData>;

export const signupSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não correspondem")
    .required("Confirmação de senha é obrigatória"),
  name: yup.string().required("Nome é obrigatório"),
  country: yup.object({
    code: yup.string(),
    phone: yup.string(),
  }),
  coord: yup.object({
    type: yup.string(),
    coordinates: yup.array().of(yup.number()),
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
    defaultValues: {
      country: {
        code: "BR",
        phone: "55",
      },
      coord: {
        type: "Point",
        coordinates: [0, 0],
      },
    },
  });
  return formProps;
};

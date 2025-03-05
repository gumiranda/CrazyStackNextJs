"use client";
import {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";

import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useUi } from "./UiContext";
import { api, signOut } from "@/shared/api";
import { parseJSON } from "../utils/parseJSON";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  email: string;
  ownerId: string;
  role: string;
  myOwnerId: string;
  createdById: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
  serviceIds?: string[];
  daysSinceRegister?: number;
  phone?: string;
  slug?: string;
};

type AuthProviderProps = {
  children: ReactNode;
};
type LoginCredentials = {
  email: string;
  password: string;
};
type SignupCredentials = LoginCredentials & {
  name: string;
  phone: string;
  role?: string;
  coord?: any;
  passwordConfirmation: string;
  cpf?: string;
  cnpj?: string;
  cnpjActive?: boolean;
};

type AuthContextData = {
  login(credentials: LoginCredentials): Promise<void>;
  signup(credentials: SignupCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  setUser: (user: User) => void;
  userPhoto: any;
  updateUserPhoto: (newPhoto: string) => void;
  signInDialogIsOpen: boolean;
  setSignInDialogIsOpen: (value: boolean) => void;
};
const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { t } = useTranslation(["PAGES"]);
  const { showModal, setLoading } = useUi();
  const [user, setUser] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
  const isAuthenticated = !!user;
  const router = useRouter();
  const logout = () => {
    setCookie(undefined, "belezixclient.token", "", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie(undefined, "belezixclient.refreshToken", "", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie(undefined, "belezixclient.user", "", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    signOut();
    setUser(null);
  };
  useEffect(() => {
    const {
      "belezixclient.user": userComingFromCookie,
      "belezixclient.photo": photoComingFromCookie,
      "belezixclient.refreshToken": refreshToken = null,
    } = parseCookies();
    const parsedPhoto = parseJSON(photoComingFromCookie);
    const parsedUser = parseJSON(userComingFromCookie);
    if (parsedUser && refreshToken) {
      //&& parsedUser?.role === "client") {
      setUser(parsedUser);
      setUserPhoto(parsedPhoto);
    } else {
      logout();
    }
    if (parsedPhoto?.url) {
      setUserPhoto(parsedPhoto);
    }
  }, []);
  const login = async ({ email, password }: LoginCredentials) => {
    try {
      setLoading(true);
      if (!api) {
        throw new Error("API is not initialized");
      }
      const response = await api.post("auth/login", {
        email,
        password,
        passwordConfirmation: password,
      });
      const {
        accessToken: token,
        refreshToken,
        user: userResponse,
      } = response?.data || {};
      const cookieSystem = "belezixclient.";

      setCookie(undefined, cookieSystem + "token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, cookieSystem + "refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(
        undefined,
        cookieSystem + "user",
        JSON.stringify(userResponse),
        {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        },
      );
      setUser(userResponse);
      api.defaults.headers["authorization"] = `Bearer ${token}`;
      router.push("/");
    } catch (error: any) {
      showModal({
        newModalBody: null,
        type: "error",
        title: t("PAGES:MESSAGES.internalServerError", {
          defaultValue: "Erro no servidor",
        }),
        content: formatMessage(
          error?.response?.data?.message ??
            "Não foi possível concluir o login. Tente novamente mais tarde.",
        ),
      });
    } finally {
      setLoading(false);
    }
  };
  const updateUserPhoto = (newPhoto: string) => {
    setUserPhoto(newPhoto);
    destroyCookie(undefined, "belezixclient.photo");
    setCookie(undefined, "belezixclient.photo", JSON.stringify(newPhoto), {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    destroyCookie(undefined, "belezixclient.cache");
  };

  const signup = async ({
    email,
    password,
    name,
    phone,
    cpf,
    cnpj,
    cnpjActive,
  }: SignupCredentials) => {
    try {
      setLoading(true);

      if (!api) {
        throw new Error("API is not initialized");
      }
      const response = await api.post("auth/signup", {
        email,
        password,
        passwordConfirmation: password,
        name,
        phone,
        coord: {
          lat: 0,
          lng: 0,
        },
        role: "client",
        cpf: cnpjActive ? null : cpf,
        cnpj: cnpjActive ? cnpj : null,
      });
      const {
        accessToken: token,
        refreshToken,
        user: userResponse,
      } = response?.data || {};
      const userComing = userResponse; ///userModel(userResponse).format();
      setCookie(undefined, "belezixclient.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "belezixclient.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "belezixclient.user", JSON.stringify(userComing), {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser(userComing as User);
      api.defaults.timeout = 5000;
      api.defaults.headers["authorization"] = `Bearer ${token}`;
      showModal({
        newModalBody: null,
        type: "success",
        title: "Muito bem!",
        subtitle: "Cadastro feito com sucesso",
        content: "Você já pode confirmar seu email.",
      });

      router.push("/");
    } catch (error: any) {
      setLoading(false);
      showModal({
        newModalBody: null,
        type: "error",
        title: t("PAGES:MESSAGES.internalServerError", {
          defaultValue: "Erro no servidor",
        }),
        content: formatMessage(
          error?.response?.data?.message ??
            "Não foi possível concluir o login. Tente novamente mais tarde.",
        ),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signup,
        setUser,
        login,
        isAuthenticated,
        user,
        logout,
        userPhoto,
        updateUserPhoto,
        signInDialogIsOpen,
        setSignInDialogIsOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
const formatMessage = (message: string) => {
  switch (message) {
    case "The received email is already in use":
      return "O e-mail ou a senha estão incorretos";
    case "headers must have required property 'refreshtoken'":
      return "Não foi possível concluir o login. Tente novamente mais tarde.";
    default:
      return message;
  }
};
export const verifyEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  if (!api) {
    throw new Error("API is not initialized");
  }
  const response = await api.post("auth/verify-email", {
    email,
    token,
  });
  return response;
};

import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { Input, Button } from "@/components";
import Image from "next/image";
import icons from "@/assets";
import { handleLogin } from "@/api/users";
import { useState, useContext } from "react";
import ReactLoading from "react-loading";
import AuthContext from "@/context";
import { useEffect } from "react";

interface LoginUserProps {
  handleRegister: () => void;
}

export default function LoginUser({ handleRegister }: LoginUserProps) {
  const [loadingHandleLogin, setLoadingHandleLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, login } = useContext(AuthContext);
  const router = useRouter();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Digite um email válido.")
      .required("Esse campo é obrigatório")
      .max(35, "Email grande da poxa 😳"),
    password: yup
      .string()
      .required("Este campo é obrigatório")
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(20, "A senha não deve exceder 20 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número"
      ),
  });

  useEffect(() => {
    if (user) {
      console.log("USER CHEGOU NO ESTADO", user);
      setTimeout(() => {
        router.push("/calendar");
        setLoadingHandleLogin(false);
      }, 500);
    } else {
      console.log("USER NÃO CHEGOU NO ESTADO AINDA");
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!formik.isValid) {
        formik.touched.email = true;
        formik.touched.password = true;
      }
      try {
        setLoadingHandleLogin(true);
        const result = await handleLogin(values.email, values.password);
        if (result.message) {
          setErrorMessage(result.message);
          setLoadingHandleLogin(false);
          return;
        }
        setErrorMessage("");
        console.log("RESULT", result);
        login(result);
        localStorage.setItem("user", JSON.stringify(result));
      } catch (error) {
        console.log(error);
        setLoadingHandleLogin(false);
      }
    },
  });

  return (
    <div className="w-[38%] flex flex-col gap-2 h-full items-center justify-center">
      <h1 className="text-3xl text-secondary">Acesse sua conta</h1>
      <Input
        label="Email"
        name={"email"}
        value={formik.values.email}
        onChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        placeholder="João@gmail.com"
        error={formik.errors.email}
        touched={formik.touched.email}
      />
      <Input
        label="Senha"
        name={"password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        placeholder="********"
        type="password"
        error={formik.errors.password}
        touched={formik.touched.password}
      />
      <p className="text-red-500">{errorMessage}</p>
      <div className="w-full flex items-center justify-evenly my-6">
        <Button
          onClick={formik.handleSubmit}
          label={
            loadingHandleLogin ? (
              <ReactLoading type="spin" color="#fff" height={24} width={24} />
            ) : (
              "Entrar"
            )
          }
          type="primary"
          typeButton="submit"
          disabled={!formik.isValid || loadingHandleLogin}
        />
        <a
          className="cursor-pointer hover:scale-105 transition-all transform"
          onClick={handleRegister}
        >
          Não tenho conta
        </a>
      </div>
      <button
        onClick={() =>
          window.alert(
            "Entrar com o google é apenas um exemplo de implementação, não é funcional."
          )
        }
        className="flex items-center justify-center gap-4 bg-[#3B78E7] p-2 rounded-[4px] w-[250px]"
      >
        <div className="bg-white p-1 flex items-center justify-center rounded-full">
          <Image
            src={icons.googleIcon}
            alt="Google Icon"
            className="w-[26px]"
          />
        </div>
        <p className="text-white text-[16px]">Entrar com Google</p>
      </button>
    </div>
  );
}

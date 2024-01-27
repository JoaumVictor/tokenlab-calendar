import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Input } from "@/components";
import { useState } from "react";
import { handleRegister } from "@/api/users";
import { useRouter } from "next/navigation";

interface RegisterUserProps {
  handleLogin: () => void;
}

export default function RegisterUser({ handleLogin }: RegisterUserProps) {
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Esse campo é obrigatório")
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(35, "O nome não deve exceder 35 caracteres")
      .matches(
        /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/,
        "O nome não pode conter números ou símbolos"
      ),
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
    confirmPassword: yup
      .string()
      .required("Este campo é obrigatório")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!formik.isValid) {
        formik.touched.name = true;
        formik.touched.email = true;
        formik.touched.password = true;
        formik.touched.confirmPassword = true;
      }
      try {
        setLoadingRegister(true);
        const result = await handleRegister(
          values.name,
          values.email,
          values.password
        );
        if (result.message) {
          setErrorMessage(result.message);
          return;
        }
        setErrorMessage("");
        handleLogin();
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRegister(false);
      }
    },
  });

  return (
    <div className="w-[38%] flex flex-col h-full items-center justify-center">
      <h1 className="text-3xl text-secondary">Crie sua conta</h1>
      <Input
        label="Nome"
        name={"name"}
        value={formik.values.name}
        onChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        placeholder="Maria"
        error={formik.errors.name}
        touched={formik.touched.name}
      />
      <Input
        label="Email"
        name={"email"}
        value={formik.values.email}
        onChange={
          formik.handleChange as (
            event: React.ChangeEvent<HTMLInputElement>
          ) => void
        }
        handleBlur={formik.handleBlur}
        placeholder="Maria@gmail.com"
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
      <Input
        label="Confirmar senha"
        name={"confirmPassword"}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        placeholder="********"
        type="password"
        error={formik.errors.confirmPassword}
        touched={formik.touched.confirmPassword}
      />
      <p className="text-red-500">{errorMessage}</p>
      <div className="w-full flex items-center justify-evenly my-6">
        <Button
          onClick={formik.handleSubmit}
          label="Registrar"
          type="primary"
          disabled={!formik.isValid}
        />
        <a
          className="cursor-pointer hover:scale-105 transition-all transform"
          onClick={handleLogin}
        >
          Já tenho conta
        </a>
      </div>
    </div>
  );
}

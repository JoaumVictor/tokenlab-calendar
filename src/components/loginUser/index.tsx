import * as yup from "yup";
import { useFormik } from "formik";

import { Input, Button } from "@/components";
import Image from "next/image";
import icons from "@/assets";

interface LoginUserProps {
  handleRegister: () => void;
}

export default function LoginUser({ handleRegister }: LoginUserProps) {
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!formik.isValid) {
        formik.touched.email = true;
        formik.touched.password = true;
      }
      console.log("válido", values);
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
        placeholder="JohDue@gmail.com"
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
      <div className="w-full flex items-center justify-evenly my-6">
        <Button
          onClick={formik.handleSubmit}
          label="Entrar"
          type="primary"
          disabled={!formik.isValid}
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

"use client";
import Link from "next/link";
import React, { useState } from "react";
import FormItems from "src/components/common/form/form-items.component";
import FormRoot from "src/components/common/form/form-root.component";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { TField } from "src/components/common/form/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ErrorMessage from "src/components/common/form/common/error-message.component";

const fields: TField[] = [
  {
    field: "input",
    placeholder: "votre email",
    label: "Email",
    name: "email",
    registerOptions: {
      required: true,
      requiredMessage: "Email obligatoire",
    },
  },
  {
    field: "input",
    inputType: "password",
    placeholder: "votre mot de passe",
    label: "Mot de passe",
    name: "password",
    registerOptions: {
      required: true,
      requiredMessage: "Mot de passe obligatoire",
    },
  },
];

export type TLoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const methods = useForm<TLoginFormValues | FieldValues>();

  const handleLogin: SubmitHandler<TLoginFormValues | FieldValues> = async (
    data
  ) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error === "Unauthorized") {
      setError("Echec de la connexion");
    } else {
      // router.push("/accueil");
    }
  };
  return (
    <div className="login-container">
      <FormProvider {...methods}>
        <FormRoot
          title="Se connecter"
          methods={methods}
          onSubmit={handleLogin}
          isModal={false}
        >
          {error && <ErrorMessage errorMessage={error} />}
          <FormItems fieldItems={fields} />
        </FormRoot>
      </FormProvider>
      <div className="create-login-container">
        <p>
          Vous n'avez pas de compte ?{" "}
          <Link href="/auth/register">Créer votre compte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

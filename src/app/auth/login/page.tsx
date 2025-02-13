"use client";
import React, { useState } from "react";
import FormItems from "src/components/common/form/form-items.component";
import FormRoot from "src/components/common/form/form-root.component";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { TFields } from "src/components/common/form/form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorMessage from "src/components/common/form/common/error-message.component";
import LinkForm from "src/components/auth/link-form.component";

const fields: TFields[] = [
  {
    columnSide: "left",
    items: [
      {
        fieldElement: "input",
        placeholder: "votre email",
        label: "Email",
        name: "email",
        registerOptions: {
          required: {
            value: true,
            message: "L'email est obligatoire",
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Le format de l'email n'est pas bon",
          },
        },
      },
      {
        fieldElement: "input",
        inputType: "password",
        placeholder: "votre mot de passe",
        label: "Mot de passe",
        name: "password",
        registerOptions: {
          required: {
            value: true,
            message: "Le mot de passe est obligatoire",
          },
        },
      },
    ],
  },
];

export type TLoginFormValues = {
  email: string;
  password: string;
};

export default function Page() {
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
      router.replace("/admin");
    }
  };
  return (
    <div className="login-container">
      <FormProvider {...methods}>
        <FormRoot title="Se connecter" methods={methods} onSubmit={handleLogin}>
          {error && <ErrorMessage errorMessage={error} />}
          <FormItems fieldItems={fields} />
        </FormRoot>
      </FormProvider>
      <LinkForm
        textContent="Vous n'avez pas de compte ?"
        path="/auth/register"
        linkContent="&thinsp;Créez votre compte"
      />
    </div>
  );
}

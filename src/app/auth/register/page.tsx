"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import LinkForm from "src/components/common/auth/link-form.component";
import ErrorMessage from "src/components/common/form/common/error-message.component";
import { TFields } from "src/components/common/form/form";
import FormItems from "src/components/common/form/form-items.component";
import FormRoot from "src/components/common/form/form-root.component";
import { UserService } from "src/services/user.service";

export type TRegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  description?: string;
  birthdate?: Date;
  nationality?: string;
  picture?: string;
};

const Register = () => {
  const methods = useForm<TRegisterFormValues | FieldValues>();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const fields: TFields[] = [
    {
      columnSide: "left",
      items: [
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Jean",
          label: "Votre prénom",
          name: "firstName",
          registerOptions: {
            required: {
              value: true,
              message: "Le prénom est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Dupont",
          label: "Votre nom",
          name: "lastName",
          registerOptions: {
            required: {
              value: true,
              message: "Le nom est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "email",
          placeholder: "jean.dupont@mail.fr",
          label: "Votre email",
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
      ],
    },
    {
      columnSide: "right",
      items: [
        {
          fieldElement: "input",
          inputType: "password",
          placeholder: "mot de passe",
          label: "Votre mot de passe",
          name: "password",
          registerOptions: {
            required: {
              value: true,
              message: "Le mot de passe est obligatoire",
            },
            pattern: {
              value: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
              message: "Le format du mot de passe n'est pas correct",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "password",
          placeholder: "mot de passe",
          label: "Confirmation du mot de passe",
          name: "confirmPassword",
          registerOptions: {
            required: {
              value: true,
              message: "La confirmation du mot de passe est obligatoire",
            },
            validate: (value, formValues) => {
              return (
                value === formValues.password ||
                "les mots de passe doivent correspondre"
              );
            },
          },
        },
      ],
    },
  ];

  const handleLogin: SubmitHandler<TRegisterFormValues | FieldValues> = async (
    data
  ) => {
    delete data.confirmPassword;
    const newData = {
      ...data,
    };

    try {
      const res = await UserService.create(newData);
      if (res.status === 201) {
        router.push("/auth/login");
      }
    } catch (error: any) {
      if (error.message === "Network Error") {
        setError("Erreur avec le serveur");
        return null;
      }

      if (error.response.status === 409) {
        methods.setError("email", { message: "Cet email est déjà pris" });
      }
    }
  };
  return (
    <div className="register-container">
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
      <LinkForm
        textContent="Vous avez déjà un compte ?"
        path="/auth/login"
        linkContent="&thinsp;Connectez vous"
      />
    </div>
  );
};

export default Register;

"use client";
import Link from "next/link";
import React from "react";
import FormItems from "src/components/common/form/form-items.component";
import FormRoot from "src/components/common/form/form-root.component";
import { TField } from "src/components/common/form/form.hook";

const fields: TField[] = [
  {
    field: "input",
    inputType: "mail",
    placeholder: "votre email",
    label: "Email",
  },
  {
    field: "input",
    inputType: "password",
    placeholder: "votre mot de passe",
    label: "Mot de passe",
  },
];

const Login = () => {
  const handleLogin = () => {
    console.log("ok");
  };
  return (
    <div className="login-container">
      <FormRoot title="Se connecter" handleSubmit={handleLogin} isModal={false}>
        <FormItems fieldItems={fields} />
      </FormRoot>
      <div className="create-login-container">
        <p>
          Vous n'avez pas de compte ? <Link href="#">Créer votre compte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

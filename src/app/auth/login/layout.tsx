import Image from "next/image";
import React from "react";
import BoxImage from "public/images/box-image.png";

export type TLoginLayout = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: TLoginLayout) => {
  return (
    <>
      {children}
      <div className="login-layout-container">
        <h1>Le carton neuf</h1>
        <Image
          src={BoxImage}
          alt="Image de la page de connexion ou de souscription"
        />
      </div>
    </>
  );
};

export default LoginLayout;

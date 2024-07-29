import Image from "next/image";
import React from "react";
import BoxImage from "public/images/box-image.png";

export type TAuthLayout = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: TAuthLayout) => {
  return (
    <main className="auth-layout-container">
      <div className="auth-layout-section">
        {children}
        <div className="left-auth-layout-container">
          <h1>Le carton neuf</h1>
          <Image
            src={BoxImage}
            alt="Image de la page de connexion ou de souscription"
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;

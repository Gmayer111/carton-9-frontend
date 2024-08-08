import React from "react";

export type TAuthLayout = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: TAuthLayout) => {
  return (
    <main className="auth-layout-container">
      <div className="auth-layout-section">{children}</div>
    </main>
  );
};

export default AuthLayout;

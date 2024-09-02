import React from "react";

export type TAdminLayout = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: TAdminLayout) => {
  return <div className="admin-layout-container">{children}</div>;
};

export default AdminLayout;

import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div style={{ maxWidth: '100%', maxHeight: '100%'}}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

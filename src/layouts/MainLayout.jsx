import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <CustomNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

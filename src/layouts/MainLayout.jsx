import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* Fixed Navbar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <CustomNavbar />
      </div>

      {/* Add padding-top equal to navbar height so content isn't hidden */}
      <main style={{ paddingTop: "110px" }}>  
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

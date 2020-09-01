import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout = ({ children, index }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div>
        <Header />
        <div className={`w-full`}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

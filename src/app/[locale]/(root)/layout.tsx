import Footer from "@/components/common/footer";
import Header from "@/components/common/Header";
import FirstHeaer from "@/components/common/Header/FirstHeaer";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
}

const MainLayout = async ({ children }: IAdmin) => {
  

  return (
    <>
      <main className="">
        <FirstHeaer />
        <Header />

        {children}
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;

import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex min-h-[calc(100vh-73px)] flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;

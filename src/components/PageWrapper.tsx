"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f3] text-[#1b1c19] selection:bg-[#c4ebde] selection:text-[#00251d]">
      <Navbar />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
};

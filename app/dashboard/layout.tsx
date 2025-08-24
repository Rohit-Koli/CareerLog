import React from "react";
import Link from "next/link";
import Navbar from "../components/DashNavbar/page"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return(
        <>        
        <Navbar />
        {children}
        </>
    )
}

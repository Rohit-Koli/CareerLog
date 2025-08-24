import React from "react";
import Navbar from "@/components/DashNavbar/page"

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

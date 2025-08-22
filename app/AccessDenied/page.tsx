// app/dashboard/AccessDenied.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccessDenied() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [router]);

  return <h1 className="text-2xl font-bold">Access Denied. Redirecting...</h1>;
}

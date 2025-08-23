"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("/api/users/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          router.push("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (err) {
        console.error(err);
      }
    };

    logout();
  },[]);
}

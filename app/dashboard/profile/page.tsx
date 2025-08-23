"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [user, setUser] = useState<any>({ name: "", username: "", email: "", password: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", {
          credentials: "include", // sends cookies automatically
        });
        const data = await res.json();
        if (res.ok) setUser(data);
        else toast.error(data.error);
      } catch (err) {
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends cookies
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) toast.success("Profile updated successfully!");
      else toast.error(data.error);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="w-full max-w-md space-y-4">
        {["name", "username", "email", "password"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={(user as any)[field] || ""}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
        ))}

        <button
          onClick={handleUpdate}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

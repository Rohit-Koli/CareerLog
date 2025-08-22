"use client";
import Navbar from "../components/Navbar/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("✅ Login successful!");
        setForm({ username: "", password: "" });

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error(data.error || "❌ Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            Career<span className="text-blue-600">Log</span>
          </h1>

          <div className="p-6 sm:p-8 rounded-2xl shadow-sm border-2 border-gray-700">
            <h1 className="text-center text-3xl font-semibold">Sign in</h1>

            <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium mb-2 block">Username</label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full text-sm border px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="btn w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

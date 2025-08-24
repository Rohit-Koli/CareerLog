"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar/page";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)      
      });
    
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      toast.success("User registered successfully!");
      setForm({ name: "", username: "", email: "", password: "" });
      setTimeout(() => {
        router.push("/login");
      },4500);
    } else {
      toast.error(data.error || "Registration Failed!");
    }
    }catch(err){
      console.log(err);
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
            <h1 className="text-center text-3xl font-semibold">Register</h1>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {["name", "username", "email", "password"].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium mb-2 block capitalize">{field}</label>
                  <input
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full text-sm border px-4 py-3 rounded-md outline-blue-600"
                    placeholder={`Enter your ${field}`}
                  />
                </div>
              ))}

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

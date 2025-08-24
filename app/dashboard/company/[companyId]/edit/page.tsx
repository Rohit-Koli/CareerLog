"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { companyId: string } }) {
  const [form, setForm] = useState({
    name: "",
    hrName: "",
    hrEmail: "",
    contactNumber: "",
    website: "",
    openedPositions: "",
    response: "",
    description: "",
    anyConnections: "",
    status: "",
    address: "",
    industry: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/company/${params.companyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include", // ✅ ensures cookies (JWT) are sent
    });

    if (res.ok) {
      alert("Company updated successfully!");
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert(data.message || "Error updating company");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} className="border p-2" />
      <input name="hrName" placeholder="HR Name" value={form.hrName} onChange={handleChange} className="border p-2" />
      <input name="hrEmail" placeholder="HR Email" value={form.hrEmail} onChange={handleChange} className="border p-2" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2" />
      <button type="submit" className="bg-blue-600 text-white p-2">Update</button>
    </form>
  );
}

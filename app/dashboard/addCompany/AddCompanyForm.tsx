"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Company } from "@/types/Company";

interface Props {
  onAdd?: (company: Company) => void;
}

export default function AddCompanyForm({ onAdd }: Props) {
// export default function AddCompanyForm({ onAdd }: Props) {
  const [form, setForm] = useState<Company>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        // toast.success("Company added successfully!");
        onAdd && onAdd(data);
        setForm({
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
      } else {
        toast.error(data.error || "Failed to add company");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form className="space-y-4 max-w-xl mx-auto mb-8" onSubmit={handleSubmit}>
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
          {key === "description" ? (
            <textarea
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md outline-blue-600"
            />
          ) : (
            <input
              type="text"
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md outline-blue-600"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Company
      </button>
    </form>
  );
}

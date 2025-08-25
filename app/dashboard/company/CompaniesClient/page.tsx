"use client";

import { useEffect, useState } from "react";
import { Company } from "@/types/Company";
import CompanyCard from "@/components/CompanyCard/page";
import { toast } from "react-toastify";

export default function CompaniesClient() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("/api/companies", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCompanies(data.companies || []);
      } else {
        toast.error("Failed to load companies");
      }
    };
    fetchCompanies();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/companies/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) setCompanies((prev) => prev.filter((c) => c._id !== id));
    else toast.error("Failed to delete company");
  };

  // const handleEdit = async (id: string, updates: Partial<Company>) => {
  //   const res = await fetch(`/api/companies/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify(updates),
  //   });
  //   if (res.ok) {
  //     const updated: Company = await res.json();
  //     setCompanies((prev) => prev.map((c) => (c._id === id ? updated : c)));
  //   } else toast.error("Failed to update company");
  // };

  const handleEdit = async (id: string, updates: Partial<Company>) => {
  try {
    const res = await fetch(`/api/companies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      toast.error(errorMsg || "Failed to update company");
      return;
    }

    const updated: Company = await res.json();
    setCompanies((prev) =>
      prev.map((c) => (c._id === id ? { ...c, ...updated } : c))
    );
    toast.success("Company updated successfully");
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Something went wrong while updating");
  }
};

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {companies.length > 0 ? (
        companies.map((c) => (
          <CompanyCard
            key={c._id}
            company={c}
            onDelete={() => handleDelete(c._id!)}
            onEdit={(id, updates) => handleEdit(id, updates)}
          />
        ))
      ) : (
        <p className="text-center mt-8 text-gray-500">No companies found</p>
      )}
    </div>
  );
}

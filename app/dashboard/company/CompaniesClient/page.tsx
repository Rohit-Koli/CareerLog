"use client";

import { useEffect, useState } from "react";
import { Company } from "@/types/Company";
import CompanyCard from "@/components/CompanyCard/page";
import { toast } from "react-toastify";

interface CompaniesClientProps {
  initialCompanies: Company[];
}

export default function CompaniesClient({ initialCompanies }: CompaniesClientProps) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies || []);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("/api/companies", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setCompanies(data.companies);
      } else {
        toast.error("Failed to load companies");
      }
    };
    fetchCompanies();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/companies/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c._id !== id));
      toast.success("Company deleted successfully");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to delete company");
    }
  };

  const handleEdit = async (id: string, updates: Partial<Company>) => {
    const res = await fetch(`/api/companies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const updatedCompany: Company = await res.json();
      setCompanies((prev) =>
        prev.map((c) => (c._id === id ? { ...c, ...updatedCompany } : c))
      );
      toast.success("Company updated successfully");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to update company");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Companies</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              onDelete={() => handleDelete(company._id!)}
              onEdit={(id: string, updates: Partial<Company>) => handleEdit(id, updates)}
            />
          ))
        ) : (
          <p className="text-center mt-8 text-gray-500">No companies found</p>
        )}
      </div>
    </div>
  );
}

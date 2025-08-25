"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Company } from "@/types/Company";
import CompanyCard from "@/components/CompanyCard/page";
import AddCompanyForm from "@/app/dashboard/addCompany/AddCompanyForm";

export default function CompaniesClient() {
  const [companies, setCompanies] = useState<Company[]>([]);

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies", {
          credentials: "include", // send cookies for auth
        });

        if (!res.ok) throw new Error("Failed to fetch companies");

        const data = await res.json();
        setCompanies(data.companies || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load companies");
      }
    };

    fetchCompanies();
  }, []);

  // Handle adding a new company
  const handleAdd =async (newCompany: Company) => {
    // setCompanies((prev) => [newCompany, ...prev]);
    try {
    const res = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newCompany),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to add company");
    }

    const savedCompany: Company = await res.json();

    // ✅ only add company returned by backend (with _id)
    setCompanies((prev) => [savedCompany, ...prev]);

    toast.success("Company added successfully");
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Error adding company");
  }
  };

  // Handle deleting a company
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/companies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete company");
      }

      setCompanies((prev) => prev.filter((c) => c._id !== id));
      toast.success("Company deleted successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error deleting company");
    }
  };

  // Handle editing a company
  const handleEdit = async (id: string, updates: Partial<Company>) => {
    try {
      const res = await fetch(`/api/companies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update company");
      }

      const updatedCompany: Company = await res.json();
      setCompanies((prev) =>
        prev.map((c) => (c._id === id ? { ...c, ...updatedCompany } : c))
      );
      toast.success("Company updated successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error updating company");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Companies</h1>

      {/* Add Company Form */}
      <AddCompanyForm onAdd={handleAdd} />

      {/* Companies List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {companies.length > 0 ? (
          companies.map((company,index) => (
            <CompanyCard
              key={company._id || index}
              company={company}
              onDelete={() => handleDelete(company._id!)}
              onEdit={(id: string, updates: Partial<Company>) =>
                handleEdit(id, updates)
              }
            />
          ))
        ) : (
          <p className="text-center mt-8 text-gray-500">No companies found</p>
        )}
      </div>
    </div>
  );
}

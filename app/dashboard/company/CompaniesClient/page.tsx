"use client";

import { useState } from "react";
import { Company } from "@/types/Company";
import CompanyCard from "@/app/components/CompanyCard/page";
import AddCompanyForm from "@/app/dashboard/addCompany/page";

export default function Page({ initialCompanies }: { initialCompanies: Company[] }) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const handleAdd = (newCompany: Company) => {
    setCompanies((prev) => [...prev, newCompany]);
  };

  const handleDelete = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Companies</h1>

      {/* Add Company Form */}
      {/* <AddCompanyForm onAdd={handleAdd} /> */}

      {/* Companies List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              onDelete={() => company._id && handleDelete(company._id)}
              onEdit={() => console.log("Edit", company._id)}
            />
          ))
        ) : (
          <p className="text-center mt-8 text-gray-500">No companies found</p>
        )}
      </div>
    </div>
  );
}

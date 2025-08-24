// Company Details Page inside Dashboard
// "use client";
import { cookies } from "next/headers";
import AccessDeniedRedirect from "@/app/AccessDenied/page";
import jwt from "jsonwebtoken";
import { Company } from "@/types/Company";
import CompanyCard from "@/components/CompanyCard/page";
import AddCompanyForm from "@/app/dashboard/addCompany/page";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AccessDeniedRedirect />
      </div>
    );
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Fetch companies from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/companies`);
    const data = await res.json();

    const companies: Company[] = data.companies || [];

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">My Companies</h1>

        {/* Add Company Form */}
        <AddCompanyForm
          onAdd={(newCompany) => companies.push(newCompany)}
        />

        {/* Companies List */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {companies.length > 0 ? (
            companies.map((company) => (
              <CompanyCard
                key={company._id}
                company={company}
                onDelete={() => console.log("Delete", company._id)}
                onEdit={() => console.log("Edit", company._id)}
              />
            ))
          ) : (
            <p className="text-center mt-8 text-gray-500">No companies found</p>
          )}
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Invalid or expired token. Please log in again.
        </h1>
      </div>
    );
  }
}

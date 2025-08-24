import { cookies } from "next/headers";
import AccessDeniedRedirect from "@/app/AccessDenied/page";
import jwt from "jsonwebtoken";
import CompaniesClient from "./CompaniesClient/page";

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
    jwt.verify(token, process.env.JWT_SECRET!);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // 👇 Forward cookies (important!)
    const res = await fetch(`${API_URL}/api/companies`, {
      cache: "no-store",
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch companies: ${res.status}`);
    }

    const data = await res.json();

    return <CompaniesClient initialCompanies={data.companies || []} />;
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

import AccessDeniedRedirect from "../AccessDenied/page";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
import Navbar from "../components/DashNavbar/page"

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
        const decoded= jwt.verify(token, process.env.JWT_SECRET!);
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
                </div>
            </>
        
    );
    } catch (err) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Invalid or expired token. Please log in again.</h1>
            </div>
        );        
    }
}
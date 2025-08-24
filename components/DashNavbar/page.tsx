import Profile from "@/public/profile.jpg";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl rounded-2xl" href="/dashboard">CareerLog</Link>
        </div>
        <div className="flex gap-2">
            {/* Search Button Input */}
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image alt="Tailwind CSS Navbar component" width={40} height={40} src={Profile.src} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" href="/dashboard/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="" href="/dashboard/company">
                  Company Details
                </Link>
              </li>
              <li>
                <Link className="" href="/dashboard/addCompany">
                  Add Company Details
                </Link>
              </li>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

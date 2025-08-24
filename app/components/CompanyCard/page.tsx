"use client";

import { Company } from "@/types/Company";

interface CompanyCardProps {
  company?: Company;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function Page({ company, onDelete, onEdit }: CompanyCardProps) {
  if (!company) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-6 border border-gray-100 max-w-lg w-full mx-auto flex flex-col justify-between">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{company.name}</h2>
        <p className="text-sm text-gray-500">{company.industry}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
        <p><span className="font-medium">HR:</span> {company.hrName}</p>
        <p><span className="font-medium">Email:</span> {company.hrEmail}</p>
        <p><span className="font-medium">Contact:</span> {company.contactNumber}</p>
        <p><span className="font-medium">Website:</span> {company.website}</p>
        <p><span className="font-medium">Positions:</span> {company.openedPositions}</p>
        <p><span className="font-medium">Response:</span> {company.response}</p>
        <p className="sm:col-span-2"><span className="font-medium">Description:</span> {company.description}</p>
        <p><span className="font-medium">Connections:</span> {company.anyConnections}</p>
        <p><span className="font-medium">Status:</span> {company.status}</p>
        <p className="sm:col-span-2"><span className="font-medium">Address:</span> {company.address}</p>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-3 mt-6">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

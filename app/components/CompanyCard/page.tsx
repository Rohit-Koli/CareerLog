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
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

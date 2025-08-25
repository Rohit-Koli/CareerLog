"use client";

import { Company } from "@/types/Company";
import { useState, useEffect } from "react";

interface CompanyCardProps {
  company: Company;
  onDelete?: () => void;
  onEdit?: (id: string, updates: Partial<Company>) => void;
}

export default function CompanyCard({ company, onDelete, onEdit }: CompanyCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Local state for all editable fields
  const [name, setName] = useState(company.name);
  const [industry, setIndustry] = useState(company.industry || "");
  const [hrName, setHrName] = useState(company.hrName || "");
  const [hrEmail, setHrEmail] = useState(company.hrEmail || "");
  const [contactNumber, setContactNumber] = useState(company.contactNumber || "");
  const [website, setWebsite] = useState(company.website || "");
  const [openedPositions, setOpenedPositions] = useState(company.openedPositions || "");
  const [response, setResponse] = useState(company.response || "");
  const [description, setDescription] = useState(company.description || "");
  const [anyConnections, setAnyConnections] = useState(company.anyConnections || "");
  const [status, setStatus] = useState(company.status || "");
  const [address, setAddress] = useState(company.address || "");

  // 🔹 Keep local state in sync with parent `company` (fix for instant update after save)
  useEffect(() => {
    setName(company.name);
    setIndustry(company.industry || "");
    setHrName(company.hrName || "");
    setHrEmail(company.hrEmail || "");
    setContactNumber(company.contactNumber || "");
    setWebsite(company.website || "");
    setOpenedPositions(company.openedPositions || "");
    setResponse(company.response || "");
    setDescription(company.description || "");
    setAnyConnections(company.anyConnections || "");
    setStatus(company.status || "");
    setAddress(company.address || "");
  }, [company]);

  const handleSave = () => {
    if (onEdit && company._id) {
      onEdit(company._id, {
        name,
        industry,
        hrName,
        hrEmail,
        contactNumber,
        website,
        openedPositions,
        response,
        description,
        anyConnections,
        status,
        address
      });

      // 🔹 Immediately reflect saved changes
      Object.assign(company, {
        name,
        industry,
        hrName,
        hrEmail,
        contactNumber,
        website,
        openedPositions,
        response,
        description,
        anyConnections,
        status,
        address
      });

      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-6 border border-gray-100 max-w-lg w-full mx-auto flex flex-col justify-between">
      {isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <input className="border rounded p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Company Name" />
          <input className="border rounded p-2" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" />
          <input className="border rounded p-2" value={hrName} onChange={(e) => setHrName(e.target.value)} placeholder="HR Name" />
          <input className="border rounded p-2" value={hrEmail} onChange={(e) => setHrEmail(e.target.value)} placeholder="HR Email" />
          <input className="border rounded p-2" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" />
          <input className="border rounded p-2" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
          <input className="border rounded p-2" value={openedPositions} onChange={(e) => setOpenedPositions(e.target.value)} placeholder="Opened Positions" />
          <input className="border rounded p-2" value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Response" />
          <textarea className="border rounded p-2 sm:col-span-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input className="border rounded p-2" value={anyConnections} onChange={(e) => setAnyConnections(e.target.value)} placeholder="Connections" />
          <input className="border rounded p-2" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
          <textarea className="border rounded p-2 sm:col-span-2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
          <div className="sm:col-span-2 flex justify-end gap-3 mt-3">
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {/* Display Mode */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{company.name}</h2>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
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
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

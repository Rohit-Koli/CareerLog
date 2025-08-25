import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Company schema
const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  hrName: String,
  hrEmail: String,
  contactNumber: String,
  website: String,
  openedPositions: String,
  response: String,
  description: String,
  anyConnections: String,
  status: String,
  address: String,
  industry: String,
});

// Interfaces for TS
export interface ICompany extends Document {
  name: string;
  hrName?: string;
  hrEmail?: string;
  contactNumber?: string;
  website?: string;
  openedPositions?: string;
  response?: string;
  description?: string;
  anyConnections?: string;
  status?: string;
  address?: string;
  industry?: string;
}

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  companies: ICompany[];
}

// User schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companies: [companySchema], // Embedded documents
});

// Avoid model overwrite in Next.js hot reload
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

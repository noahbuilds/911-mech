import mongoose from "mongoose";
import { Gender } from "../enums/gender";
import { IContractor } from "../interface/contractor";
import bcrypt from 'bcrypt'

const contractorSchema = new mongoose.Schema<IContractor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true,unique: true, uppercase: false },
  password: { type: String, required: true },
  gender: { type: String, enum: Gender, required: true },
  location: {type: String},
  token: {type: String},
  phoneNumber: {type:String},
  service: {type: [String]}


},
{
  timestamps: true,
}
);

  

const Contractor = mongoose.model<IContractor>("Contractor", contractorSchema);


export  {Contractor}
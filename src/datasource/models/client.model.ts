import mongoose from "mongoose";
import { Gender } from "../enums/gender";
import { IClient } from "../interface/client";
import bcrypt from 'bcrypt'

const clientSchema = new mongoose.Schema<IClient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true,unique: true, uppercase: false },
  password: { type: String, required: true },
  gender: { type: String, enum: Gender, required: false },
  location: {type: String},
  token: {type: String},
  phoneNumber: {type:String},


},
{
  timestamps: true,
}
);

  

const Client = mongoose.model<IClient>("Client", clientSchema);


export  {Client}

import { Types } from 'mongoose';

export interface IClient {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    location: string;
    gender: string;
    token: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILogin {
    email: string;
    password: string;
}

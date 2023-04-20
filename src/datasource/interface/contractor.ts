import { Types } from 'mongoose';

export interface IContractor {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    location: string;
    gender: string;
    rating: number;
    token: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    service: IService[];
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IService {
    name: string;
    price: number;
}

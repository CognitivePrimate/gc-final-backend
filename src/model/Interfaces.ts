import { ObjectId } from "mongodb";

export interface ShiftLog {
    author: string;
    supervisor?: string;
    logText?: string;
    year?: Date;
    month?: Date;
    day?: Date;
    time?: Date;
    _id?: ObjectId;
}

export interface IncidentReport {
    author: string;
    supervisor?: string;
    incident: string;
    witnesses?: string;
    year: Date;
    month: Date;
    day: Date;
    time: Date;
    _id?: ObjectId;
}

export interface Schedule {
    firstName?: string;
    lastName?:string;
    aliases?: string;
    email?: string;
    timeIn?: Date;
    timeOut?: Date;
    _id?: ObjectId;
}

export interface EmergencyContact {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email?: string;
    _id?: ObjectId;
}
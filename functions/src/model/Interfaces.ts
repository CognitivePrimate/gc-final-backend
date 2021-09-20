import { ObjectId } from "mongodb";
export interface ShiftLog {
    // user?: firebase.User | null;
    author: string;
    supervisor?: string;
    logText: string;
    year: Date;
    month: Date;
    day: Date;
    hours: Date;
    minutes?: Date
    time?: Date;
    _id: ObjectId;
}

export interface IncidentReport {
    author: string;
    supervisor?: string;
    incident: string;
    witnesses?: string[];
    year: Date;
    month: Date;
    day: Date;
    hours: Date;
    minutes: Date; 
    time: Date;
    _id: ObjectId;
}

export interface ScheduleRow {
    firstName?: string;
    lastName?:string;
    aliases?: string;
    email?: string;
    timeIn?: number;
    timeOut?: number;
    _id?: ObjectId;
}

export interface TimeBlock {
    scheduleRows: ScheduleRow[];
    volunteersNeeded: number;
    dateNeeded: any;
    startTime: number;
    endTime: number;
    _id?: ObjectId;
}

export interface Schedule {
    timeBlocks: TimeBlock[];
    dateNeeded: Date | string;
    yearCreated: Date;
    monthCreated: Date;
    dayCreated: Date;
    _id: ObjectId;
}

export interface HistoricalSchedule {
    schedule: Schedule;
    yearCreated: Date;
    monthCreated: Date;
    dayCreated: Date;
    _id: ObjectId;
}

export interface EmergencyContact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role?: string;
    email?: string;
    _id: ObjectId;
}
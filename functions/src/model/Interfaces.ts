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
    timeIn?: Date;
    timeOut?: Date;
    _id?: ObjectId;
}

export interface TimeBlock {
    scheduleRows: ScheduleRow[];
    volunteersNeeded: number;
    dateNeeded: any;
    startTime: number;
    endTime: number;
    yearCreated?: Date;
    monthCreated?: Date;
    dayCreated?: Date;
    _id?: ObjectId;
    
}

export interface Schedule {
    timeBlocks: TimeBlock[];
    dateNeeded: any;
    yearCreated?: Date;
    monthCreated?: Date;
    dayCreated?: Date;
    _id?: ObjectId;
}

export interface HistoricalSchedule {
    schedule: Schedule;
    yearCreated?: Date;
    monthCreated?: Date;
    dayCreated?: Date;
    _id?: ObjectId;

}

export interface EmergencyContact {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email?: string;
    _id?: ObjectId;
}
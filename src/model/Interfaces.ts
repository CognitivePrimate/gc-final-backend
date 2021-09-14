import { ObjectId } from "bson";

export interface ShiftLog {
    author: string;
    supervisor?: string;
    logText: string;
    year: Date;
    month: Date;
    day: Date;
    time: Date;
    _id?: ObjectId;
}
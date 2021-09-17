import * as functions from "firebase-functions";


// imported modules
import express from "express";
import cors from "cors";


// local imports
import shiftLogRoutes from "./shift-log-routes";
import incidentLogRoutes from "./incidentLogRoutes"
import scheduleRoutes from  "./scheduleRoutes";
import emergencyContactRoutes from "./emergencyContactRoutes";

// create instance of express
const app = express();

// enable ability to parse body of requests
app.use(express.json());

// enables cors
app.use(cors());


// add routes to application ---ASK KYLE HOW TO SPECIFICALLY SET THIS UP (can't be "/" for all, can it?)
app.use("/", shiftLogRoutes, incidentLogRoutes, scheduleRoutes, emergencyContactRoutes);
// app.use("/blergh", incidentLogRoutes);
// app.use("/Schedules", scheduleRoutes);
// app.use("/emergencyContacts", emergencyContactRoutes);


// start server
export const api = functions.https.onRequest(app)


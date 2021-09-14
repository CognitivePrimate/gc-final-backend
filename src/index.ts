// imported modules
import path from "path";
import express from "express";
import cors from "cors";


// local imports
import shiftLogRoutes from "./shift-log-routes";
import incidentLogRoutes from "./incidentLogRoutes"
import scheduleRoutes from  "./scheduleRoutes";

// create instance of express
const app = express();

// enable ability to parse body of requests
app.use(express.json());

// enables cors
app.use(cors());

// declare port server runs on 
const port = 3000;

// add routes to application ---ASK KYLE HOW TO SPECIFICALLY SET THIS UP (can't be "/" for all, can it?)
app.use("/", shiftLogRoutes);
app.use("/incidentReports", incidentLogRoutes);
app.use("/schedule", scheduleRoutes);


// start server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

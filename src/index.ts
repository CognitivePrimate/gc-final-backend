// imported modules
import path from "path";
import express from "express";
import cors from "cors";


// local imports
import shiftLogRoutes from "./shift-log-routes";

// create instance of express
const app = express();

// enable ability to parse body of requests
app.use(express.json());

// enables cors
app.use(cors());

// declare port server runs on 
const port = 3000;

// add routes to application
app.use("/", shiftLogRoutes);

// start server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

import express from 'express';
import {getClient} from './db';
import {ObjectId} from 'mongodb';
import {IncidentReport} from './model/Interfaces';

const incidentLogRoutes = express.Router();

// get IncidentReports
incidentLogRoutes.get("/IncidentReports", (req, res) => {
    console.log("in Get")
    getClient().then(client => {
        return client.db().collection<IncidentReport>('IncidentReports').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get an IncidentReport by id
incidentLogRoutes.get("/IncidentReports/:id", (req, res) => {
    const id = req.params.id;
    (console.log("get by id", id))
    getClient().then(client => {
        return client.db().collection<IncidentReport>('IncidentReports').findOne({ _id : new ObjectId(id) }).then(IncidentReport => {
            (console.log("in .then"))
            if (IncidentReport) {
                res.json(IncidentReport);
            } else {
                res.status(404).json({message: "Not Found"});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// add an IncidentReport
incidentLogRoutes.post("/IncidentReports", (req, res) => {
    const IncidentReport = req.body as IncidentReport;
    getClient().then(client => {
        return client.db().collection<IncidentReport>('IncidentReports').insertOne(IncidentReport).then(result => {
            IncidentReport._id = result.insertedId;
            res.status(201).json(IncidentReport);
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update an IncidentReport by id
incidentLogRoutes.put("/IncidentReports/:id", (req, res) => {
    const id = req.params.id;
    const IncidentReport = req.body as IncidentReport;
    // delete IncidentReport._id;
    getClient().then(client => {
        return client.db().collection<IncidentReport>('IncidentReports').updateOne({_id: new ObjectId(id)},{$set: {IncidentReport}}).then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({message: "Not Found"});
            } else {
                IncidentReport._id = new ObjectId(id);
                res.json(IncidentReport);
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// delete an IncidentReport by id
incidentLogRoutes.delete("/IncidentReports/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<IncidentReport>('IncidentReports').deleteOne({ _id: new ObjectId(id) }).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({message: "Not Found"});
            } else {
                res.status(204).end();
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})


export default incidentLogRoutes;
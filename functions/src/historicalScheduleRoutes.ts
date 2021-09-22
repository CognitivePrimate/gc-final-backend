import express from 'express';
import {getClient} from './db';
import {ObjectId} from 'mongodb';
import {HistoricalSchedule} from './model/Interfaces';

const historicalScheduleRoutes = express.Router();

// get HistoricalSchedules
historicalScheduleRoutes.get("/HistoricalSchedules", (req, res) => {
    getClient().then(client => {
        return client.db().collection<HistoricalSchedule>('HistoricalSchedules').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get an HistoricalSchedule by id
historicalScheduleRoutes.get("/HistoricalSchedules/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<HistoricalSchedule>('HistoricalSchedules').findOne({ _id : new ObjectId(id) }).then(HistoricalSchedule => {
            if (HistoricalSchedule) {
                res.json(HistoricalSchedule);
            } else {
                res.status(404).json({message: "Not Found"});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// add an HistoricalSchedule
historicalScheduleRoutes.post("/HistoricalSchedules", (req, res) => {
    const HistoricalSchedule = req.body as HistoricalSchedule;
    getClient().then(client => {
        return client.db().collection<HistoricalSchedule>('HistoricalSchedules').insertOne(HistoricalSchedule).then(result => {
            HistoricalSchedule._id = result.insertedId;
            res.status(201).json(HistoricalSchedule);
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update an HistoricalSchedule by id
historicalScheduleRoutes.put("/HistoricalSchedules/:id", (req, res) => {
    const id = req.params.id;
    const HistoricalSchedule = req.body as HistoricalSchedule;
    delete HistoricalSchedule._id;
    getClient().then(client => {
        return client.db().collection<HistoricalSchedule>('HistoricalSchedules').updateOne({_id: new ObjectId(id)},{$set: HistoricalSchedule}).then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({message: "Not Found"});
            } else {
                HistoricalSchedule._id = new ObjectId(id);
                res.json(HistoricalSchedule);
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// delete an HistoricalSchedule by id
historicalScheduleRoutes.delete("/HistoricalSchedules/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<HistoricalSchedule>('HistoricalSchedules').deleteOne({ _id: new ObjectId(id) }).then(result => {
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


export default historicalScheduleRoutes;
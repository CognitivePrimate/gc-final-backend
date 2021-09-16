import express from 'express';
import {getClient} from './db';
import {ObjectId} from 'mongodb';
import {Schedule} from './model/Interfaces';

const scheduleRoutes = express.Router();

// get Schedules
scheduleRoutes.get("/Schedules", (req, res) => {
    getClient().then(client => {
        return client.db().collection<Schedule>('Schedules').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get an Schedule by id
scheduleRoutes.get("/Schedules/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<Schedule>('Schedules').findOne({ _id : new ObjectId(id) }).then(Schedule => {
            if (Schedule) {
                res.json(Schedule);
            } else {
                res.status(404).json({message: "Not Found"});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// add an Schedule
scheduleRoutes.post("/Schedules", (req, res) => {
    const Schedule = req.body as Schedule;
    getClient().then(client => {
        return client.db().collection<Schedule>('Schedules').insertOne(Schedule).then(result => {
            Schedule._id = result.insertedId;
            res.status(201).json(Schedule);
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update an Schedule by id
scheduleRoutes.put("/Schedules/:id", (req, res) => {
    const id = req.params.id;
    const Schedule = req.body as Schedule;
    delete Schedule._id;
    getClient().then(client => {
        return client.db().collection<Schedule>('Schedules').updateOne({_id: new ObjectId(id)},{$set: {Schedule}}).then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({message: "Not Found"});
            } else {
                Schedule._id = new ObjectId(id);
                res.json(Schedule);
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// delete an Schedule by id
scheduleRoutes.delete("/Schedules/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<Schedule>('Schedules').deleteOne({ _id: new ObjectId(id) }).then(result => {
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


export default scheduleRoutes;
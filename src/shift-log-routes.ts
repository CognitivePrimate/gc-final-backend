import express from 'express';
import {getClient} from './db';
import {ObjectId} from 'mongodb';
import {ShiftLog} from './model/Interfaces';

const shiftLogRoutes = express.Router();

// get ShiftLogs
shiftLogRoutes.get("/ShiftLogs", (req, res) => {
    getClient().then(client => {
        return client.db().collection<ShiftLog>('ShiftLogs').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get an ShiftLog by id
shiftLogRoutes.get("/ShiftLogs/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<ShiftLog>('ShiftLogs').findOne({ _id : new ObjectId(id) }).then(ShiftLog => {
            if (ShiftLog) {
                res.json(ShiftLog);
            } else {
                res.status(404).json({message: "Not Found"});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// add an ShiftLog
shiftLogRoutes.post("/ShiftLogs", (req, res) => {
    const ShiftLog = req.body as ShiftLog;
    getClient().then(client => {
        return client.db().collection<ShiftLog>('ShiftLogs').insertOne(ShiftLog).then(result => {
            ShiftLog._id = result.insertedId;
            res.status(201).json(ShiftLog);
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update an ShiftLog by id
// shiftLogRoutes.put("/ShiftLogs/:id", (req, res) => {
//     const id = req.params.id;
//     const ShiftLog = req.body as ShiftLog;
//     delete ShiftLog._id;
//     getClient().then(client => {
//         return client.db().collection<ShiftLog>('ShiftLogs').updateOne({ _id: new ObjectId(id) }, ShiftLog).then(result => {
//             if (result.modifiedCount === 0) {
//                 res.status(404).json({message: "Not Found"});
//             } else {
//                 ShiftLog._id = new ObjectId(id);
//                 res.json(ShiftLog);
//             }
//         });
//     }).catch(err => {
//         console.error("FAIL", err);
//         res.status(500).json({message: "Internal Server Error"});
//     });
// })

shiftLogRoutes.put("/ShiftLogs/:id", (req, res) => {
    const id = req.params.id;
    const ShiftLog = req.body as ShiftLog;
    // delete ShiftLog._id;
    getClient().then(client => {
        return client.db().collection<ShiftLog>('ShiftLogs').updateOne({_id: new ObjectId(id)},{$set: {ShiftLog}})
        .then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({message: "Not Found"});
            } else {
                ShiftLog._id = new ObjectId(id);
                res.json(ShiftLog);
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// delete an ShiftLog by id
shiftLogRoutes.delete("/ShiftLogs/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<ShiftLog>('ShiftLogs').deleteOne({ _id: new ObjectId(id) }).then(result => {
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


export default shiftLogRoutes;
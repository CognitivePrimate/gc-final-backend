import express from 'express';
import {getClient} from './db';
import {ObjectId} from 'mongodb';
import {EmergencyContact} from './model/Interfaces';

const emergencyContactRoutes = express.Router();

// get emergencyContacts
emergencyContactRoutes.get("/EmergencyContacts", (req, res) => {
    getClient().then(client => {
        return client.db().collection<EmergencyContact>('EmergencyContacts').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get an emergencyContact by id
emergencyContactRoutes.get("/EmergencyContacts/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<EmergencyContact>('EmergencyContacts').findOne({ _id : new ObjectId(id) }).then(emergencyContact => {
            if (emergencyContact) {
                res.json(emergencyContact);
            } else {
                res.status(404).json({message: "Not Found"});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// add an emergencyContact
emergencyContactRoutes.post("/EmergencyContacts", (req, res) => {
    const emergencyContact = req.body as EmergencyContact;
    getClient().then(client => {
        return client.db().collection<EmergencyContact>('EmergencyContacts').insertOne(emergencyContact).then(result => {
            emergencyContact._id = result.insertedId;
            res.status(201).json(emergencyContact);
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update an emergencyContact by id
emergencyContactRoutes.put("/EmergencyContacts/:id", (req, res) => {
    const id = req.params.id;
    const emergencyContact = req.body as EmergencyContact;
    delete emergencyContact._id;
    console.log(emergencyContact);
    getClient().then(client => {
        console.log(emergencyContact);
        return client.db().collection<EmergencyContact>('EmergencyContacts').updateOne({_id: new ObjectId(id)},{$set: emergencyContact}).then(result => {
            console.log(result);
            if (result.modifiedCount === 0) {
                res.status(404).json({message: "Not Found"});
            } else {
                emergencyContact._id = new ObjectId(id);
                res.json(emergencyContact);
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// delete an emergencyContact by id
emergencyContactRoutes.delete("/EmergencyContacts/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<EmergencyContact>('EmergencyContacts').deleteOne({ _id: new ObjectId(id) }).then(result => {
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


export default emergencyContactRoutes;
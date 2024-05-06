const { connect } = require('../db/db');
const ObjectId = require('mongodb').ObjectId;


async function getAllNotes() {
    const db = await connect(process.env.MONGO_URI, process.env.MONGO_DB);
    const collection = db.collection('notes');
    return collection.find().toArray();
}

async function createNote(note) {
    const db = await connect(process.env.MONGO_URI, process.env.MONGO_DB);
    const collection = db.collection('notes');
    const result = await collection.insertOne(note);
    return result;
}

async function getNoteById(idNote) {
    const db = await connect(process.env.MONGO_URI, process.env.MONGO_DB);
    const collection = db.collection('notes');
    return collection.findOne({_id: new ObjectId(idNote)});
}

async function updateNote(idNote, newData) {
    const db = await connect(process.env.MONGO_URI, process.env.MONGO_DB);
    const collection = db.collection('notes');
    return collection.updateOne({ _id: new ObjectId(idNote) }, { $set: newData });
}

async function deleteNote(idNote) {
    const db = await connect(process.env.MONGO_URI, process.env.MONGO_DB);
    const collection = db.collection('notes');
    return collection.deleteOne({ _id: new ObjectId(idNote)  });
}

module.exports = { createNote,deleteNote,getAllNotes,getNoteById,updateNote };
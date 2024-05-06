const NoteModel = require('../models/notes');

async function getAllNotes(req, res) {
    try {
        const notes = await NoteModel.getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createNote(req, res) {
    try {
        const note = await NoteModel.createNote(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getNoteById(req, res) {
    try {
        const note = await NoteModel.getNoteById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
}

async function updateNote(req, res) {
    try {
        const updatedNote = await NoteModel.updateNote(req.params.id, req.body);
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteNote(req, res) {
    try {
        const result = await NoteModel.deleteNote(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {createNote,deleteNote,getAllNotes,getNoteById,updateNote};
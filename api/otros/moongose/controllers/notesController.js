const Note = require('../models/notes');

async function getAllNotes(req, res, next) {
    try {
        const notes = await Note.find({});
        if (notes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron notas' });
        }
        res.json(notes);
    } catch (error) {
        next(error); 
    }
}

async function createNote(req, res,next) {
    try {
        const note =  new Note(req.body);
        const result = await note.save()
        if(!result){
            return res.status(404).json({ error: 'No se creo la nota' });
        }
        res.status(201).json(result);
    } catch (error) {
       next(error)
    }
}

async function getNoteById(req, res, next) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ error: 'No no encontrada' });
        }
        res.json(note);
     } catch (error) {
        next(error)
     }
}

async function updateNote(req, res,next) {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            { _id:  req.params.id},
            { $set: { ...req.body } },
            { new: true }
        )
        if (!updatedNote) {
            return res.status(400).json({ error: 'No se pudo actualizar' });
        }
        res.json(updatedNote);
    } catch (error) {
       next(error)
    }
}

async function deleteNote(req, res,next) {
    try {
        const result = await Note.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(400).json({ error: 'No elimino' });
        }
        res.json(result);
    } catch (error) {
       next(error)
    }
}

module.exports = {createNote,deleteNote,getAllNotes,getNoteById,updateNote};
const Note = require('../models/Note');
const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const {NoteNotFoundError,BadRequestError} = require('../errors');
const noteRepository = require('../repositories/noteRepository');
const userRepository = require('../repositories/userRepository');


async function getAllNotes(req, res, next) {
    try {
        const { id } = req.user;
        const notes = await noteRepository.findNoteByUserId(id)
    
        if (!notes || notes.length === 0) {
            throw new NoteNotFoundError('No se encontraron notas.');
        }
    
        res.status(StatusCodes.OK).json(notes);
    } catch (error) {
        next(error);

    }
}

async function createNote(req, res,next) {
    try {
        const { title, body } = req.body;
        const {id} = req.user;
    
        const user = await userRepository.findById(id);
    
        if (!user) {
            throw new NoteNotFoundError('Usuario no encontrado');
        }
    
        const note ={
            title,
            body,
            user: id
        };
    
        const result = await noteRepository.createNote(note);
    
        if (!result) {
            throw new NoteNotFoundError('No se pudo crear la nota');
        }
    
        await userRepository.addNoteToUser(user,result._id)
    
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(error);

    }
}

async function getNoteById(req, res, next) {
    try {
        const {id} = req.user;

        const note = await noteRepository.findNoteById({_id:req.params.id,user:id});
        console.log(note)
        if (!note) {
            throw new NoteNotFoundError('Nota no encontrada');
        }
    
        res.status(StatusCodes.OK).json(note);
    } catch (error) {
        next(error);
    }
}

async function updateNote(req, res,next) {
    try {
        const {id} = req.user;
        const {title,body} = req.body

        if(!title || !body ){
            throw new BadRequestError("Title or Body fields cannot be empty")
        }

        const updatedNote = await noteRepository.updateNote(
            {_id:req.params.id,user:id},
            { ...req.body },
            { new: true }
        )
            
    
        if (!updatedNote) {
            throw new NoteNotFoundError('No se pudo actualizar la nota');
        }
    
        res.status(StatusCodes.OK).json(updatedNote);
    } catch (error) {
        next(error);
    }
}

async function deleteNote(req, res,next) {
    try {
        const {id} = req.user;;
        const result = await noteRepository.deleteNote({_id:req.params.id,user:id});
        
        if (!result) {
            throw new NoteNotFoundError('No se encontró la nota para eliminar');
        }
    
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);

    }
}

module.exports = {createNote,deleteNote,getAllNotes,getNoteById,updateNote};
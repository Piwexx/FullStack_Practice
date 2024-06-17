// src/controllers/NoteController.js
const { StatusCodes } = require('http-status-codes');
const NoteService = require('../../services/notesService/notesService');

async function getAllNotes(req, res, next) {
  try {
    const { id } = req.user;
    const notes = await NoteService.getAllNotes(id);
    res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    next(error);
  }
}

async function createNote(req, res, next) {
  try {
    const { id } = req.user;
    const noteData = req.body;
    const result = await NoteService.createNote(id, noteData);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
}

async function getNoteById(req, res, next) {
  try {
    const { id } = req.user;
    const noteId = req.params.id;
    const note = await NoteService.getNoteById(id, noteId);
    res.status(StatusCodes.OK).json(note);
  } catch (error) {
    next(error);
  }
}

async function updateNote(req, res, next) {
  try {
    const { id } = req.user;
    const noteId = req.params.id;
    const noteData = req.body;
    const updatedNote = await NoteService.updateNote(id, noteId, noteData);
    res.status(StatusCodes.OK).json(updatedNote);
  } catch (error) {
    next(error);
  }
}

async function deleteNote(req, res, next) {
  try {
    const { id } = req.user;
    const noteId = req.params.id;
    const result = await NoteService.deleteNote(id, noteId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllNotes, createNote, getNoteById, updateNote, deleteNote };
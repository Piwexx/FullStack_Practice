const express = require('express');
const router = express.Router();
const { createNote,getAllNotes,deleteNote,getNoteById,updateNote} = require('../controllers/notesController');

router.get('/',getAllNotes );
router.post('/note',createNote );
router.get('/note/:id',getNoteById );
router.put('/note/:id', updateNote);
router.delete('/note/:id',deleteNote);

module.exports = router;
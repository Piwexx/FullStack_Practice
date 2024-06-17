const router = require('express').Router();
const { createNote,getAllNotes,deleteNote,getNoteById,updateNote} = require('../controllers/notesController');

// Middleware aplicado solo a las rutas que siguen
router.use(authMiddleware);

// Rutas que requieren autenticación
router.get('/',getAllNotes);
router.post('/note',createNote );
router.get('/note/:id',getNoteById );
router.put('/note/:id', updateNote);
router.delete('/note/:id',deleteNote);

module.exports = router;
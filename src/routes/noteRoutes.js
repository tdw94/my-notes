const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

const verifyToken = require('../middleware/authMiddleware');
router
    .route('/:id')
    .put(verifyToken, notesController.editNote)
    .delete(verifyToken, notesController.deleteNote);

router
    .route('/')
    .post(verifyToken, notesController.addNote)
    .get(verifyToken, notesController.getAllNotes);

module.exports = router;
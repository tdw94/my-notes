const Note = require('../models/noteModel');

const addNote = async (req, res) => {
    console.log(req.body, req.user);
    try {
        const { title, description, priority } = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user

        const newNote = new Note({
            title,
            description,
            priority,
            user: userId
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add note', error });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const notes = await Note.find({ user: userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get notes', error });
    }
};

const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority } = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user

        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, user: userId },
            { title, description, priority },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to edit note', error });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assuming user ID is available in req.user

        const deletedNote = await Note.findOneAndDelete({ _id: id, user: userId });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
};

module.exports = {
    addNote,
    getAllNotes,
    editNote,
    deleteNote
};
const { database } = require('../config/db');

const createNote = async (req, res) => {
    try {
        const { title, content, pinned,
            status, } = req.body;
        const note = {
            title,
            content,
            pinned,
            status,
            updatedAt: new Date()
        }

        const resp = await database.insert(note);
        res.status(201).json({
            message: "Note created",
            data: resp
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// get All Notes
const GetAllNotes = async (req, res) => {
    try {
        const resp = await database.list({ include_docs: true });
        const allData = resp.rows.map(r => r.doc);
        res.status(200).json({ notes: allData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//update Note

async function updateNote(req, res) {
    try {
        let { id } = req.params;
        let { title, content, pinned,
            status, } = req.body;
        note = await database.get(id);
        updateNoteData = {
            ...note,
            title,
            pinned,
            status,
            content,
            updatedAt: new Date()
        }
        response = await database.insert(updateNoteData);
        res.status(200).json({
            message: 'updated',
            data: response
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// delete note
async function deleteNotes(req, res) {
    try {
        let { id } = req.params;
        note = await database.get(id);

        response = database.destroy(id, note._rev);
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ error: err.message });

    }
}

module.exports = { GetAllNotes, deleteNotes, updateNote, createNote };
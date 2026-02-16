const router = require('express').Router();

const controller = require('./notes.controller');

router.post('/', controller.createNote);
router.get('/', controller.GetAllNotes);
router.delete('/:id', controller.deleteNotes);
router.put('/:id', controller.updateNote);

module.exports = router;
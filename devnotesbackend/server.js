const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./config/db');
const notesRoutes = require('./controllers/notes.routes');

const app = express();

app.use(cors());
app.use(express.json());

database.CheckDb();

app.get('/', (req, res) => {
    res.send("DevNotes API Running");

});
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


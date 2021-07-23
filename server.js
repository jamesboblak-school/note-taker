// Consts
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

// Helper method for creating random uuid's
const uuid = require('./helpers/uuid');
const PORT = 3001;
const app = express();

// Middleware for parsing json and URLs
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// Routes
// GET index.html page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {


  // Read all saved notes from db.json.
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // Parse JSON into object
    res.json(JSON.parse(data));
  });
  return;
});

// POST note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const {
    title,
    text
  } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      unique_id: uuid(),
    };

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
          writeErr ?
          console.error(writeErr) :
          console.info('Successfully updated notes!')
        );
      }
    });

    // Report if successful
    const response = {
      status: 'success',
      body: newNote,
    };

    // print the response to the Terminal and to the body
    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

// Report that the app is listening to the Terminal
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
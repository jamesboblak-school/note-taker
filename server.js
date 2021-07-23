const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
// GET index.html page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


  // Report that the app is listening to the Terminal
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
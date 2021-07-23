const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

  // Report that the app is listening to the Terminal
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
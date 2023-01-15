const express = require('express');
const indexRoutes = require("./routes/index");
const notesRoutes = require("./routes/notes");

// Creating port and starting server
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
//Use routes information
app.use('/api', notesRoutes);
app.use('/', indexRoutes)

//Listening port
app.listen(PORT, () =>
    console.log(`Server available at http://localhost:${PORT}`)
);
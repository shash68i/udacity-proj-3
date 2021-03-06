// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Get Endpoint 
app.get("/apiGet", (req, res) => {
    res.json(projectData);
  });

// Post endpoint 
app.post("/api", (req, res) => {
    const newData = req.body;
    projectData = {...newData};
    res.status(201).json(projectData);
  });


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server running at port ${port}`);
}

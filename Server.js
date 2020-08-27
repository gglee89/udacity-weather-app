// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Endpoints
app.get('/data', (req, res) => {
    return res.send(projectData);
});

app.post('/data', (req, res) => {
    const data = req.body;

    try {
        projectData.push(data);
        return res.send({
            success: true,
            message: "success",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "Error while trying to process request.",
            error: error
        });
    }
});

// Setup Server
app.listen(PORT, () => {
    console.log(`Localhost server started at port ${PORT}`);
});
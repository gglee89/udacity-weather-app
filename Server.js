const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // For cross-origin allowance

// Endpoints
app.get('/', (req, res) => {
    res.send({ text: 'Hello World' });
});

app.listen(PORT, () => {
    console.log('Server started listening to port: ' + PORT);
});
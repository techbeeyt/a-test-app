const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

const app = express();

// Enable CORS for all requests without specifying options
app.use(cors());

// setup static path 
app.use(express.static(__dirname + '/public'));

// Use express built-in bodyParser middleware to parse JSON
app.use(express.json());

// Use bodyParser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Apply routes from the 'routes' module
routes(app);

// Define the port to listen for requests
const port = process.env.PORT || 8080;

// Start listening on the designated port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
// Start up an instance of app
const app = express();
/* Middleware*/
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
var projectData = {}; //database
app.post('/post', addData)

function addData(req, res) {
    console.log( 'req body',req.body)
    // projectData.push(req.body.data)
    projectData= req.body.data;
    res.send(projectData);
    console.log(projectData);
}

app.get('/getAll', (req, res) => {
    res.json(projectData);
})
app.listen(port, () => {
    console.log(`weather app is listening at http://localhost:${port}`);
})


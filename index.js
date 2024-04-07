const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const port = 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// set static folder path
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiAIRoutes'))

app.listen(port, ()=> {
    console.log("Server started on 5001")
})
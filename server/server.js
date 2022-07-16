const { application } = require('express');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

//connect to the URI in .env
const URI = process.env.ATLAS_URI;

//account to login mongodb:
//username: huujohnle@gmail.com
//password: findaroommate123



//connect to mongoDB
mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'findARoommate'
    })      
    .then(() => {
        console.log("Successfully connected to MongoDB!");
        })
    .catch((error) => {
        console.log("Unable to connect to MongoDB!");
        console.error(error);});



/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config()

/* --------------------------------------------
//account to login mongodb:
//username: huujohnle@gmail.com
//password: findaroommate123
------------------------------------------- */


//connect to the URI in .env
const URI = process.env.ATLAS_URI;

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
        console.error(error);
    });
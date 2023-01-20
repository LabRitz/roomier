/* eslint-disable no-undef */
const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const expressSession = require("express-session");
const path = require('path')
const passport = require("passport");

const { SERVER_PORT } = require("config");
const { startSession } = require('./controllers/session')

require("dotenv").config();

const app = express();
const port = SERVER_PORT || 3000;

app.use(cookieparser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist/')));

// Route all requests to MainRouter
app.use("/", require("./routes/user"));

// --------------------------------------------------------------------------------------------//
// oAuth connection
app.use(
  expressSession({
    secret: "google auth",
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/login/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/login/auth/google/callback",
  passport.authenticate("google", { failureDirect: "/"}),
  (req, res, next) => {
    res.cookie('ssid', req.session.passport.user._id);
    const user = { _id: req.session.passport.user._id }
    res.locals.user = req.session.passport.user;
    next();
  }, 
  startSession,
  (req, res) => res.redirect('/')
);

// --------------------------------------------------------------------------------------------//
//connect to mongoDB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "findARoommate",
  })
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB!");
    console.error(error);
  });

// --------------------------------------------------------------------------------------------//
// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;

const logger = require("../util/logger");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "findARoommate",
  })
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB!")
    logger.info("SUCCESS: Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("ERROR: Unable to connect to MongoDB!", err);
    logger.error("ERROR: Unable to connect to MongoDB!", err);
  });


module.exports = mongoose.connection;
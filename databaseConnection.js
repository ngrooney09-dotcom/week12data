const database = require("mongoose");

const is_hosted = process.env.IS_HOSTED === "true";
const databaseName = "lab_example";

const hostedURI = process.env.MONGODB_URI;
const localURI =
  "mongodb://localhost/" + databaseName + "?authSource=admin&retryWrites=true";

if (is_hosted) {
  console.log("USING ATLAS");
  console.log(hostedURI);
  database.connect(hostedURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} else {
  console.log("USING LOCAL MONGODB");
  console.log(localURI);
  database.connect(localURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = database;
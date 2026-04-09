const database = require("mongoose");

const is_hosted = process.env.IS_HOSTED === "true"; 
const databaseName = "lab_example";

const hostedURI =
"mongodb+srv://monk:1234a@cluster0.wowgtvj.mongodb.net/lab_example?retryWrites=true&w=majority";

const localURI =
"mongodb://localhost/" + databaseName + "?authSource=admin&retryWrites=true";

console.log("IS_HOSTED:", process.env.IS_HOSTED);
console.log("Using hosted DB:", is_hosted);

if (is_hosted) {
  console.log("Connecting to ATLAS");
  database.connect(hostedURI, { useNewUrlParser: true, useUnifiedTopology: true });
} else {
  console.log("Connecting to LOCAL");
  database.connect(localURI, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = database;
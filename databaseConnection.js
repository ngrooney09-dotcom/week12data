const database = require("mongoose");
const is_hosted = process.env.IS_HOSTED == "true";
const databaseName = "lab_example"
const hostedURI = "mongodb+srv://monk:1234a@cluster0.wowgtvj.mongodb.net/lab_example?retryWrites=true&w=majority";
const localURI = "mongodb://127.0.0.1";
"mongodb://localhost/"+databaseName+"?authSource=admin&retryWrites=true"
if (is_hosted) {
database.connect(hostedURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
database.connect(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}

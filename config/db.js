
let mongoose = require("mongoose");

require("dotenv").config();

const DBPASS = process.env.DBPASS;
const mongo_uri = `mongodb+srv://osm:${DBPASS}@cbswebsite.o6eng.mongodb.net/test?retryWrites=true&w=majority`
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true   , useUnifiedTopology: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error );
    process.exit();
  }
);




module.exports =  mongoose;
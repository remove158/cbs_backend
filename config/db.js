
let mongoose = require("mongoose");

require("dotenv").config();


const mongo_uri = process.env.mongo_uri;
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
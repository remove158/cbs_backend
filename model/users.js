const mongoose = require('../config/db');
const Schema = mongoose.Schema;

let schema  = new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:Boolean,required:false},
    refreshToken:{type:String,required:false},
})


schema.methods.speak = function () {
    const greeting = this.username
      ? "Saved user : " + this.username
      : "Doesn't save !!";
    console.log(greeting);
}

module.exports = model = mongoose.model('Users',schema);
const mongoose = require("mongoose");
require("dotenv").config();

const Database = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
    
    })
    .then(()=> console.log('MongoDB Connected ...'))
    .catch((err)=>{
        console.log(`error hai bhai ${err}`);
        console.error(err)});
}

module.exports = Database;

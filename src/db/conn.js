const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/registration').then(()=>{
    console.log("Connected to the database");   
}).catch(()=>{
    console.log("Connection failed");
})

// const config = require('../config/database');
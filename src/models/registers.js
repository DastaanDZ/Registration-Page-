const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
})

const Register  = new mongoose.model('Register', employeeSchema);
module.export = Register; 
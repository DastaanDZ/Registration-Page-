const { is } = require('express/lib/request');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

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
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})


// generate token

employeeSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id: this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        console.log(token);
        await this.save();
        return token;
    }catch(err){
        res.send(err);
        console.log(err);
    }
}

// converting password to hash  

employeeSchema.pre("save", async function(next){
    if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password,10);
    console.log(`the hashed password is ${this.password}`);
    }
    next();
})

const Register  = new mongoose.model('Register', employeeSchema);

module.exports = Register; 
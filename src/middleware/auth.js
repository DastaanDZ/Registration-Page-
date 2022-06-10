const jwt = require('jsonwebtoken');
const Register = require("../models/registers");

const auth = async(req,res, next) =>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = Register.findOne({_id: verifyUser._id});
         
        console.log(user)
        next(); 

    }catch(err){
        res.status(401).send('This is the error in auth But I Love You',err);
    }
}

module.exports = auth;
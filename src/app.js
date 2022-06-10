require('dotenv').config();
const express = require('express');
const app = express();
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
require('./db/conn');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const Register = require('./models/registers');
const path = require('path');
const async = require('hbs/lib/async');
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;


// const static_path = path.join(__dirname, '../public');
// app.use(express.static(static_path));
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);

// console.log(process.env.SECRET_KEY)

app.get("/",(req,res) =>{
    res.render('index');
});
app.get("/secret",auth,(req,res) =>{
    console.log(`this is the cookie awesome ${req.cookies.jwt}`);
    res.render('secret');
});
app.get('/register',(req,res) =>{
    res.render('register');
})

app.get('/login',(req,res) =>{
    res.render('login');
})

app.post("/register", async(req,res) =>{
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(password === confirmpassword){
            const register = new Register({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: confirmpassword
            })

            const token = await register.generateAuthToken();

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 3000),
                httpOnly: true
            })

            const registered = await register.save();
            res.status(201).render('index');
        }
        else{
            res.send('password and confirmpassword not match');
        }
    }catch(e){
        console.log(e);
        res.status(400).send("FUCK YOU");
    }
});
app.post('/login',async(req,res) =>{
    // res.render('login');
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email,password);
        const useremail = await Register.findOne({email:email});
        console.log(useremail.password);
        const isMatch = await bcrypt.compare(password,useremail.password)
        console.log(isMatch)

        const token = await useremail.generateAuthToken();
        console.log('login token' + token);

        res.cookie('jwt', token,{
            expires: new Date(Date.now() + 3000),
            httpOnly: true,
        })


        if(isMatch ){
                res.status(201).render('index');
        }else{
            res.send('password not match');
        }
    }catch(error){
        res.status(400).send(error);
    }
})

app.listen(3000,() =>{
    console.log("Server is running on port 3000");
})
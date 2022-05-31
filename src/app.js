const express = require('express');
const app = express();
const hbs = require('hbs');
require('./db/conn');

const Register = require('./models/registers');
const path = require('path');
const async = require('hbs/lib/async');
const port = process.env.PORT || 3000;

// const static_path = path.join(__dirname, '../public');
// app.use(express.static(static_path));
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) =>{
    res.render('index');
});
app.get('/register',(req,res) =>{
    res.render('register');
})

app.post("/register", async(req,res) =>{
    try{
        console.log(req.body.fullname);
        res.send(req.body.fullname);
    }catch(e){
        res.status(400).send(e);
    }
});

app.listen(3000,() =>{
    console.log("Server is running on port 3000");
})
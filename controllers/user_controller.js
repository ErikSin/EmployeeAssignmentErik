var express = require('express');
var router = express.Router();
const Parse = require('parse/node');
var cache=require('./../app.js');
const { nanoid } = require('nanoid');
const { use } = require('../routes/index.js');
const {myCache} = require('../app')
const {allUsers} = require('../data/users')

//Method to render register page
exports.renderRegister = (req, res, next) => {
    res.render('create_user.ejs', {error: null});
}

//Method to create a new user
exports.createUser = async (req, res, next) => {
    if(!req.body.password || !req.body.email || !req.body.username)
    {
        const createError = new Error("Missing field")
        res.render('create_user.ejs', {error: createError});
    }
    else
    {
        // res.render('create_user.ejs', {error: null})
        //checks it already exists
     
        const usernameExists = allUsers.find(user => user.username.toLowerCase() === req.body.username.toLowerCase()) 
        const emailExists = allUsers.find(user => user.email.toLowerCase() === req.body.email.toLowerCase())

        if(!!usernameExists || !!emailExists)
        {
            const alreadExistsError = new Error("Username/email already exist")
            res.render('create_user.ejs', {error: alreadExistsError})
        }
        else
        {
            allUsers.push({userID:nanoid() ,username:req.body.username, email:req.body.email, password:req.body.password})
            res.redirect('/')
        }
    }
}

//Method to render login page
exports.renderLogin = (req, res, next) => {
    res.render('login.ejs', {error: null});
}

//method for logging in
exports.login = (req, res, next) => {
    
    if(!req.body.password || !req.body.email )
    {
        const loginError = new Error("Missing field")
        res.render('login.ejs', {error: loginError})
    }
    
    const thisUser = allUsers.find(user =>user.email.toLowerCase() === req.body.email.toLowerCase())
    
    if(!thisUser)
    {
        
        const loginError = new Error("Email does not exist")
        res.render('login.ejs', {error: loginError})
    }

    if(thisUser.password !== req.body.password)
    {
        const loginError = new Error("Incorrect Password")
        res.render('login.ejs', {error: loginError})

    }
    
    myCache.set('user', thisUser)
    res.redirect('/route/dashboard')

}

//log user out
exports.logout = (req, res, next) => {
    //clears cache from user info
    var mycache = cache.myCache;
    mycache.flushAll();

    //Redirects users back to login page
    res.redirect('/route/login');
}





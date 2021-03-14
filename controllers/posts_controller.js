const express = require('express');
const {someUser} = require('../data/users')
const {myCache} = require('../app')

//renders home page
exports.renderDashboard= (req, res, next) => {
    if(!myCache.get('user'))
    {
        console.log(myCache.get('user'))
        res.redirect(302, '/route/login')
    }
    
    res.render('dashboard.ejs');
}

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''}); 
}
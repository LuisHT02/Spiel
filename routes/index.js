const express = require("express");
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const user = require('../models/user');

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/index', (req, res) => {
    res.render('index')
});

//Registro de usuarios


router.get('/Register', (req,res,next) => {
    res.render('Register')
});

router.post('/Register', async(req,res, done) => {
    const {email, contraseña, confirmarcontraseña, username, pais, Telefono} = req.body;
    if(contraseña != confirmarcontraseña){
        return req.flash('Registermessage', 'Las contraseñas no coinciden'), res.redirect('/Register');
    } 
    if(contraseña.length < 8){
        return req.flash('Registermessage', 'La contraseña debe ser minimo de 8 caracteres'), res.redirect('/Register');
    }else{
       const emailuser = await user.findOne({email: email});
       if(emailuser){
        return req.flash('Registermessage', 'El email ya esta registrado'), res.redirect('/Register');
       }else{
           const newUser = new user({email, contraseña, username, pais, Telefono});
           newUser.contraseña = await newUser.encriptarcontraseña(contraseña);
           await newUser.save();
           res.redirect('/Login');
       }
    }
   
});

//Login usuraio

router.get('/Login', (req,res) => {
    res.render('Login')
});

router.post('/Login', passport.authenticate('local-Login', {
    successRedirect: '/VistaGeneral',
    failureRedirect: '/Login',
    passReqToCallback: true
}));

router.get('/Torneos', (req,res,next) => {
    res.render('Torneos')
});



router.get('/VistaGeneral', (req,res,next) => {
    res.render('VistaGeneral')
});





module.exports = router;
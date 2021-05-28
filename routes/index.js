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

router.get('/VistaGeneral', async(req,res) => {
    const usersession = req.session.usersession;
   const usuario = await user.findById(usersession);
   const username = usuario.username;
    const email = usuario.email;
    const telefono = usuario.Telefono;
    const pais = usuario.pais;
    res.render('VistaGeneral',{
        username,
        email,
        telefono,
        pais
    }); 
 }); 


router.get('/Editarperfil', async(req,res) => {
    res.render('Editarperfil');
}); 

router.post('/Editarperfil', async(req,res) => {
   const usersession = req.session.usersession;
   const usuario = await user.findById(usersession);
   const emailactual = usuario.email;
   const {email, username, pais, telefono} = req.body;
    const actualizar = await user.updateOne({
        email: emailactual
    },
    {
        email: email,
        username: username,
        Telefono: telefono,
        pais: pais
    });

    res.redirect('/VistaGeneral');
});


router.get('/Juegos', (req,res) => {
    res.render('Juegos');
});


router.get('/Vertorneos', (req,res) => {
    res.render('Vertorneos');
});

module.exports = router;
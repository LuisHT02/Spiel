const express = require("express");
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res) => {
    res.render('index')
});

router.get('/index', (req, res) => {
    res.render('index')
});

//Registro de usuarios
const user = require('../models/user');

router.get('/Register', (req,res,next) => {
    res.render('Register')
});

router.post('/Register', async(req,res) => {
    const {email, contraseña, confirmarcontraseña, username, pais, Telefono} = req.body;
    if(contraseña != confirmarcontraseña){
        res.send('Las contraseñas no coinciden');
    } 
    if(contraseña.length < 8){
        res.send('La contraseña debe ser minimo de 8 caracteres');
    }else{
       const emailuser = await user.findOne({email: email});
       if(emailuser){
        res.send('El email ya esta registrado');
       }else{
           const newUser = new user({email, contraseña, username, pais, Telefono});
           newUser.contraseña = await newUser.encriptarcontraseña(contraseña);
           await newUser.save();
           res.redirect('/Login');
       }
    }
   
});

//Login usuraio
router.get('/Login', (req,res,next) => {
    res.render('Login')
});

router.post('/Login', passport.authenticate('Local-Login',{
    successRedirect: '/VistaGeneral',
    failureRedirect: '/Login',
    passReqToCallback: true
}));


router.get('/Torneos', (req,res,next) => {
    res.render('Torneos')
});



router.get('/ActualizarPerfil', (req,res,next) => {
    res.render('ActualizarPerfil')
});


module.exports = router;
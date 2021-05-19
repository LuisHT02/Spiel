const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/index', (req, res) => {
    res.render('index')
});

router.get('/Register', (req,res,next) => {
    res.render('Register')
});

router.get('/Torneos', (req,res,next) => {
    res.render('Torneos')
});

router.get('/Login', (req,res,next) => {
    res.render('Login')
});

router.get('/ActualizarPerfil', (req,res,next) => {
    res.render('ActualizarPerfil')
});


module.exports = router;
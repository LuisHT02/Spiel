const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const user = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) =>{
    user.findById(id, (err, user) =>{
        done(err, user);
    });
});

passport.use('Local-Login', new localStrategy({
    usernameField: 'email',
    passwordField: 'contraseña',
    passReqToCallback: true

}, async(req, email,contraseña, done) => {
        console.log('prueba esta entrando');
    //comprovar si el correo esta registrado
   const user = user.findOne({email})
   if(!user){
       return done(res.send('usuario no existe'), false, {message: 'usuario no existe'})
   }else{
      //validar contraseña
      const validar = await user.validarcontraseña(contraseña);
      if(validar){
          return done(null,user);
      }else{
          return done (null, false, {message: 'contraseña incorrecta'})
      }
   }
}));


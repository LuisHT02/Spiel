const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const user = require('../models/user');


passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'contraseña'

}, async(req, email,contraseña, done) => {

    //comprovar si el correo esta registrado

   const user = user.findOne(email)
   if(!user){
       return done(null, false, {message: 'usuario no existe'}); 
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) =>{
    user.findById(id, (err, user) =>{
        done(err, user);
    });
});
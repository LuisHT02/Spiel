const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});

//Autenticacion login

passport.use('local-Login', new localStrategy({
    usernameField: 'email',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async(req,email, contraseña, done) =>{
   const user = await User.findOne({email: email});
   if(!user){
        return done(null,false, req.flash('Loginmessage', 'Correo no registrado'));
    }
    if(!user.validar(contraseña)){
        return done(null, false, req.flash('Loginmessage', 'Contraseña no valida'));
    }
    done(null,user);
}));



module.exports = passport;
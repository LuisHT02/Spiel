const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    contraseña: String,
    username: String,
    pais: String,
    Telefono: Number
});

userSchema.methods.encriptarcontraseña = (contraseña) => {
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10));
};

userSchema.methods.validar = function(contraseña) {
    return bcrypt.compareSync(contraseña, this.contraseña);
}

module.exports = mongoose.model('users', userSchema);
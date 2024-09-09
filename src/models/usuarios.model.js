const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    
    usuario: String,
    empresa: String,
    tipoEmpresa: String,
    municipio: String,
    password: String,
    rol: String
    
});

module.exports = mongoose.model('Usuarios', UsuarioSchema);
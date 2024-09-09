const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SucursalesSchema = Schema({
    
    nombreSucursal: String,
    direccionSucursal: String,

    idEmpresa:{type:Schema.Types.ObjectId, ref:'Usuarios'}

});

module.exports = mongoose.model('Sucursales', SucursalesSchema)
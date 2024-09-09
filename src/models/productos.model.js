var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    
    nombreProducto: String,
    empresa: { type: Schema.ObjectId, ref: 'Empresas' },
    nombreProveedor: String,
    Stock: Number,
    
});

module.exports = mongoose.model('Productos', ProductoSchema)
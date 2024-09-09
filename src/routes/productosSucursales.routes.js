const express = require('express');
const productoSucursalController = require('../controllers/productosSucursales.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// Ver por el Id de la sucursal
api.get('/VerProductosPorSucursalesId/:idSucursal', md_autenticacion.Auth, productoSucursalController.verPoridSucursal);

// Ver por el Id del producto
api.get('/VerProductosPorProductosId/:idProducto', md_autenticacion.Auth, productoSucursalController.verPoridProducto);

// Stock Sucursal Mayor
api.get('/StockSucursalMayor', md_autenticacion.Auth, productoSucursalController.StockSucursalMayor);

// Stock Sucursal Menor
api.get('/StockSucursalMenor', md_autenticacion.Auth, productoSucursalController.StockSucursalMenor);

// Productos más vendidos
api.get('/ProductoMasVendido/:idSucursal', md_autenticacion.Auth, productoSucursalController.ProductoMasVendido);


// Enviar productos a sucursales
api.put('/EnviarProductosSucursales/:idSucursal', md_autenticacion.Auth, productoSucursalController.agregarProductosPorSucursales);

// Venta
api.put('/VentaProductosSucursales/:idSucursal', md_autenticacion.Auth, productoSucursalController.VentaProductoSucursal);

// Buscar producto sucursal nombre
api.get('/buscarPorNombre/:NombreProductoSucursal', md_autenticacion.Auth, productoSucursalController.buscarPorNombre);

// Eliminar producto
api.delete('/eliminarProductoSucursal/:idProducto', md_autenticacion.Auth, productoSucursalController.EliminarProductoSucursales)


// Obtener productos
api.get('/obtenerProductosSucursales', md_autenticacion.Auth, productoSucursalController.ObtenerProductos);


module.exports = api;
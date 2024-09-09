const express = require('express');
const productoController = require('../controllers/producto.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.get('/OrdenarStockMayor', md_autenticacion.Auth, productoController.StockMayor);
api.get('/OrdenarStockMenor', md_autenticacion.Auth, productoController.StockMenor);
api.post('/agregarProductos', md_autenticacion.Auth, productoController.agregarProductos);
api.get('/obtenerProductos', md_autenticacion.Auth, productoController.obtenerProductos);
api.put("/editarProductos/:idProducto", md_autenticacion.Auth, productoController.EditarProductos);
api.delete('/eliminarProductos/:idProducto', md_autenticacion.Auth, productoController.EliminarProductos);
api.get('/obtenerProductosId/:idProducto', md_autenticacion.Auth, productoController.obtenerProductosId);

// Buscar por nombre
api.get('/buscarProductoNombre/:nombreProducto', md_autenticacion.Auth, productoController.BuscarPorNombre);

// Buscar por proveedor
api.get('/buscarProductoProveedor/:nombreProveedor', md_autenticacion.Auth, productoController.BuscarProductoProveedor);

/*
api.get('/empresas/:idEmpresa', empresaControlador.ObtenerEmpresasId);
api.put('/editarEmpresas/:idEmpresa', empresaControlador.EditarEmpresas);
api.delete('/eliminarEmpresas/:idEmpresa', empresaControlador.EliminarEmpresas);
*/

module.exports = api;
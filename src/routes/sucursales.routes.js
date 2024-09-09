const express = require('express');
const sucursalesControlador = require('../controllers/sucursales.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();


// AGREGAR SUCURSAL
api.post("/agregarSucursal", md_autenticacion.Auth, sucursalesControlador.AgregarSucursales)
// EDITAR SUCURSAL
api.put("/editarSucursal/:idSucursal", md_autenticacion.Auth, sucursalesControlador.editarSucursal)
// ELIMINAR SUCURSAL
api.delete('/eliminarSucursales/:idSucursal', md_autenticacion.Auth, sucursalesControlador.EliminarSucursales);

// OBTENER SUCURSALES
api.get("/obtenerSucursales", md_autenticacion.Auth, sucursalesControlador.ObtenerSucursales);

// OBTENER SUCURSALES ADMIN
api.get('/SurcursalesAdmin/:idEmpresa', md_autenticacion.Auth, sucursalesControlador.ObtenerSucursalesAdmin);

// OBTENER SUCURSALES ID
api.get('/obtenerIdSucursal/:idSucursal', md_autenticacion.Auth, sucursalesControlador.ObtenerSucursalesId);



module.exports = api;
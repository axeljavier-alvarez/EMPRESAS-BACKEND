// RUTAS DEL USUARIO
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// OBTENER EMPRESAS
api.get('/obtenerEmpresas', md_autenticacion.Auth, usuarioController.obtenerEmpresas);
// OBTENER EMPRESAS ID
api.get('/obtenerEmpresasId/:idEmpresa', md_autenticacion.Auth, usuarioController.ObtenerEmpresasId);

// LOGIN
api.post('/login', usuarioController.Login);
// REGISTRAR
api.post('/registro', usuarioController.registrarEmpresas);

// ADMINISTRADOR REGISTRAR
api.post('/registrarAdmin', md_autenticacion.Auth, usuarioController.registrarEmpresasAdmin);

// EDITAR
api.put('/editarEmpresa/:idUsuario', md_autenticacion.Auth, usuarioController.EditarEmpresa);
// ELIMINAR
api.delete('/eliminarEmpresa/:idUsuario', md_autenticacion.Auth , usuarioController.EliminarEmpresas);

// EMPRESAS ID ROL EMPRESA
api.get('/rolEmpresaId/:idEmpresa', md_autenticacion.Auth, usuarioController.RolEmpresaId);

// EDITAR POR ROL EMPRESA
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, usuarioController.EditarUsuario);

module.exports = api;
/* Usuarios y empresas */

const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


// USUARIO ID ROL EMPRESA
function RolEmpresaId(req, res) {

  if (req.user.rol !== "ROL_EMPRESA") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  var idEmpresa = req.params.idEmpresa;

  Usuarios.findById(idEmpresa, (err, empresaEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!empresaEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Pacientes: empresaEncontrada }

        );
  })
}

// EDITAR POR ROL EMPRESA
function EditarUsuario(req, res) {

  var idUser = req.params.idUsuario;
  var parametros = req.body;

  if (req.user.rol !== "ROL_EMPRESA") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  Usuarios.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarUsuario) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarUsuario) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ Usuarios: editarUsuario });

    }
  );
}



// OBTENER EMPRESAS
function obtenerEmpresas(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Usuarios.find((error, verEmpresas) => {

    if (error) return res.status(500).send({ error: "Error en la petición." });

    if (verEmpresas.length == 0) {

      return res.status(500).send({ error: "No existe ninguna empresa." });

    } else {
      return res.status(200).send({ EMPRESAS: verEmpresas });
    }
  });
}

// OBTENER EMPRESAS ID
function ObtenerEmpresasId(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  var idEmpresa = req.params.idEmpresa

  Usuarios.findById(idEmpresa, (err, empresaEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!empresaEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ EMPRESAS: empresaEncontrada }
        );
  })
}





    // USUARIO POR DEFECTO
    function registrarAdmin() {

    var modeloUsuario = new Usuarios();
  
    Usuarios.find({ usuario: "SuperAdmin" }, (err, usuarioEncontrado) => {

      if (usuarioEncontrado.length > 0) {

      } else {

        modeloUsuario.usuario = "SuperAdmin";
        modeloUsuario.empresa = "SuperAdmin";
        modeloUsuario.tipoEmpresa = "SuperAdmin";
        modeloUsuario.municipio = "SuperAdmin";
        modeloUsuario.rol = "ROL_ADMIN";
  
        bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {

          modeloUsuario.password = passwordEncriptada;
  
          modeloUsuario.save((err, usuarioGuardado) => {


            if (err) return console.log("Error en la peticion");

            if (!usuarioGuardado) return console.log("Error al registrar Admin");

            return console.log("usuario registrado");
  
          });
        });
      }
    });
  }

  // REGISTRAR EMPRESAS

  function registrarEmpresas(req, res) {
      
    
      
    var parametros = req.body;

    var empresasModel = new Usuarios();

   

    if (parametros.usuario && parametros.empresa && parametros.tipoEmpresa && parametros.municipio && parametros.password) {

      empresasModel.usuario = parametros.usuario;
      empresasModel.empresa = parametros.empresa;
      empresasModel.tipoEmpresa = parametros.tipoEmpresa;
      empresasModel.municipio = parametros.municipio;
      empresasModel.password = parametros.password;
      empresasModel.rol = "ROL_EMPRESA";
  
      Usuarios.find(
        { empresa: { $regex: parametros.empresa, $options: "i" } },

        (error, empresaHallada) => {

          if (empresaHallada.length == 0) {

            bcrypt.hash(parametros.password, null, null, (error, passwordEncriptada) => {

                empresasModel.password = passwordEncriptada;

                empresasModel.save((error, empresaAgregada) => {
                  if (error)
                    return res.status(500).send({ Error: "Error en la peticion." });
                  if (!empresaAgregada)
                    return res.status(404).send({Error: "No se puede crear la empresa"});

                  return res.status(200).send({ EMPRESA: empresaAgregada });

                });
              }
            );

          } else {
            return res.status(500).send({ Error: "Ya existe la empresa" });
          }
        }

      );

    } else {
      return res.status(500).send({ Error: "Se deben llenar todos los campos" });
    }
  } 

  // REGISTRAR EMPRESAS AGAIN
  function registrarEmpresasAdmin(req, res) {
      
    
      
    var parametros = req.body;

    var empresasModel = new Usuarios();

    if (req.user.rol !== "ROL_ADMIN") {
      return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
    }
    
    if (parametros.usuario && parametros.empresa && parametros.tipoEmpresa && parametros.municipio && parametros.password
      && parametros.rol) {

      empresasModel.usuario = parametros.usuario;
      empresasModel.empresa = parametros.empresa;
      empresasModel.tipoEmpresa = parametros.tipoEmpresa;
      empresasModel.municipio = parametros.municipio;
      empresasModel.password = parametros.password;
      empresasModel.rol = parametros.rol;
  
      Usuarios.find(
        { empresa: { $regex: parametros.empresa, $options: "i" } },

        (error, empresaHallada) => {

          if (empresaHallada.length == 0) {

            bcrypt.hash(parametros.password, null, null, (error, passwordEncriptada) => {

                empresasModel.password = passwordEncriptada;

                empresasModel.save((error, empresaAgregada) => {
                  if (error)
                    return res.status(500).send({ Error: "Error en la peticion." });
                  if (!empresaAgregada)
                    return res.status(404).send({Error: "No se puede crear la empresa"});

                  return res.status(200).send({ EMPRESA: empresaAgregada });

                });
              }
            );

          } else {
            return res.status(500).send({ Error: "Ya existe la empresa" });
          }
        }

      );

    } else {
      return res.status(500).send({ Error: "Se deben llenar todos los campos" });
    }
  } 

  // LOGIN
  function Login(req, res) {

    var parametros = req.body;

    Usuarios.findOne({ usuario: parametros.usuario }, (err, usuarioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (usuarioEncontrado) {

        bcrypt.compare(parametros.password, usuarioEncontrado.password,

          (err, verificacionPassword) => {
            
            if (verificacionPassword) {

              if (parametros.obtenerToken === "true") {

                return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) });

              } else {

                usuarioEncontrado.password = undefined;
                return res.status(200).send({ usuario: usuarioEncontrado });
              }
            } else {
              return res.status(500).send({ mensaje: "Las contrasena no coincide" });
            }
          }
        );
      } else {
        return res.status(500).send({ mensaje: "Error, el usuario no se encuentra registrado." });
      }
    });
  }

  // EDITAR EMPRESA
  function EditarEmpresa(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;
  
    if (req.user.rol !== "ROL_ADMIN") {
        return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
    }
    
    Usuarios.findByIdAndUpdate(idUser,parametros,{ new: true },(err, editarUsuario) => {

        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

        if (!editarUsuario) return res.status(403).send({ mensaje: "Error al editar la empresa" });
  
        return res.status(200).send({ USUARIO: editarUsuario });

      }
    );
  }

  // ELIMINAR EMPRESA

  function EliminarEmpresas(req, res) {
    var idUser = req.params.idUsuario;
  
    if (req.user.rol !== "ROL_ADMIN") {

        return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
    }
  
    if (req.user.sub == idUser) {
      console.log(req.user.usuario);
      return res.status(500).send({ mensaje: "No se puede borrar el usuario" });
    }
  
    Usuarios.findByIdAndDelete(idUser, (err, UsuarioEliminado) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!UsuarioEliminado)

        return res.status(500).send({ mensaje: "Error al eliminar el producto" });
  
      return res.status(200).send({ usuario: UsuarioEliminado });
    });
  }




module.exports = {
    registrarAdmin,
    Login,
    registrarEmpresas,
    EditarEmpresa,
    EliminarEmpresas,
    obtenerEmpresas,
    ObtenerEmpresasId,
    registrarEmpresasAdmin,
    RolEmpresaId,
    EditarUsuario

}

/* CONTROLADOR SUCURSALES */
const Sucursales = require('../models/sucursales.model');

// Obtener Sucursales

function ObtenerSucursales(req, res) {

  if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
  }

  Sucursales.find({ idEmpresa: req.user.sub }, (err, sucursalEmpresaEncontrada) => {

    return res.status(200).send({ Sucursales: sucursalEmpresaEncontrada })
  })

}

// OBTENER SUCURSALES ADMIN
function ObtenerSucursalesAdmin(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador puede ver" });
  }

  const idEmpresa = req.params.idEmpresa;

  Sucursales.find({ idEmpresa: idEmpresa },(err, sucursalEmpresaEncontrada) => {

      return res.status(200).send({ Sucursales: sucursalEmpresaEncontrada });
    }
  );

}


// Obtener Sucursales Id
function ObtenerSucursalesId(req, res){

  if (req.user.rol !== "ROL_EMPRESA") {
    return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
  }

    var idSucu = req.params.idSucursal;
 
    Sucursales.findOne({_id : idSucu, idEmpresa : req.user.sub}, (err, obtenerSucursales) => {

        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });

        if(!obtenerSucursales) return res.status(500).send({ mensaje: "no se pueden visualizar las sucursales de esa empresa"});

        return res.status(200).send({ SUCURSALES: obtenerSucursales }
            );
    }
    )
}

// Agregar Sucursales
function AgregarSucursales(req, res) {
    var parametros = req.body;
    var sucursalModel = new Sucursales();

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }
  
    if (parametros.nombreSucursal && parametros.direccionSucursal) {

      sucursalModel.nombreSucursal = parametros.nombreSucursal;
      sucursalModel.direccionSucursal = parametros.direccionSucursal;
      sucursalModel.idEmpresa = req.user.sub;
  
      sucursalModel.save((error, crearSucursales) => {

        if (error) return res.status(500).send({ error: "Error al momento de crear la sucursal" });

        if (!crearSucursales) return res.status(500).send({ error: "No se puede agregar la sucursal" });

        return res.status(200).send({ SUCURSALES: crearSucursales }
            );
      }
      );

      }
  }
 
// Editar Sucursales
function editarSucursal(req, res) {
    var idSuc = req.params.idSucursal;
    var parametros = req.body;
  
    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    if (parametros.nombreSucursal || parametros.direccionSucursal) {

      Sucursales.findOneAndUpdate({ _id: idSuc, idEmpresa: req.user.sub }, parametros,{ new: true },(error, sucursalModificada) => {

          if (error) return res.status(500).send({ error: "Error al momento de modificar"});
          if (!sucursalModificada) return res.status(500).send({ error: "No existe la sucursal" });
          return res.status(200).send({ SUCURSALES: sucursalModificada }
            );
        }
      );
    } 
  }

// Eliminar Sucursales
function EliminarSucursales(req, res) {
    
    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    var idSucursal = req.params.idSucursal;
  
    Sucursales.findByIdAndDelete({ _id: idSucursal, idEmpresa: req.user.sub }, (error, sucursalEliminada) => {
        if (error) return res.status(500).send({ Error: "Error al querer eliminar la sucursal" });
        if (!sucursalEliminada)
          return res.status(500).send({ Error: "No existe la sucursal" });

        return res.status(200).send({ SUCURSALES: sucursalEliminada }
            );
      }
    );
}



module.exports={
    ObtenerSucursalesAdmin,
    ObtenerSucursales,
    ObtenerSucursalesId,
    AgregarSucursales,
    editarSucursal,
    EliminarSucursales,
}
var Productos = require('../models/productos.model');
var fs = require('fs');
var path = require('path');

// BUSCAR PRODUCTOS POR NOMBRE
function BuscarPorNombre(req,res){

  if (req.user.rol !== "ROL_EMPRESA") {
    return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
  }

  var nombreProducto = req.params.nombreProducto; 

  Productos.find({nombreProducto: {$regex:nombreProducto,$options:'i'}}, (err, nombreProductoEncontrado)=>{

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!nombreProductoEncontrado) return res.status(404).send({ mensaje: 'No se obtuvieron los datos' });
      return res.status(200).send({ Productos: nombreProductoEncontrado });
  })
}

// BUSCAR PRODUCTOS POR PROVEEDOR
function BuscarProductoProveedor(req,res){

  if (req.user.rol !== "ROL_EMPRESA") {
    return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
  }

  var nombreProveedor = req.params.nombreProveedor;

  Productos.find({nombreProveedor: {$regex:nombreProveedor,$options:'i'}}, (err, proveedorProductoEncontrado)=>{

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!proveedorProductoEncontrado) return res.status(404).send({ mensaje: 'No se obtuvieron los datos' });
      return res.status(200).send({ Productos: proveedorProductoEncontrado });
  })
}

// STOCK MAYOR

function StockMayor(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    Productos.find({ idEmpresa: req.user.sub },(err, productoEncontrado) => {

        if (err) return res.status(404).send({ mensaje: "No se encuentra el producto" });
        return res.status(200).send({ PRODUCTOS: productoEncontrado });
      }
    ).sort({Stock: -1})

  
  }

// STOCK MENOR
function StockMenor(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    Productos.find({ idEmpresa: req.user.sub }, (err, productoEncontrado) => {
        if (err) return res.status(404).send({ mensaje: "No se encuentra el producto" });
        return res.status(200).send({ PRODUCTOS: productoEncontrado });
      }

    ).sort({Stock: 1})
  
  }
  

// OBTENER PRODUCTOS
function obtenerProductos(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    Productos.find({ empresa: req.user.sub }, (err, productosEmpresasEncontrados) => {
  
      return res.status(200).send({ PRODUCTOS: productosEmpresasEncontrados})
    })
  
  }

function obtenerProductosId(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    var idProd = req.params.idProducto;

    Productos.findById({ _id: idProd }, (error, productoEncontrado) => {
      if (error) return res.status(500).send({ error: "Error al obtener los productos" });
      return res.status(200).send({ PRODUCTOS: productoEncontrado });
    });

  }

// AGREGAR PRODUCTOS
function agregarProductos(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    var empresaID = req.user.sub;
    var params = req.body;


    if (req.user.rol === 'ROL_EMPRESA') {

        if (params.nombreProducto) {
            var productoModel = new Productos();
            productoModel.nombreProducto = params.nombreProducto;
            productoModel.nombreProveedor = params.nombreProveedor;
            productoModel.Stock = params.Stock;
            productoModel.empresa = empresaID;

            Productos.find({
                nombreProducto: params.nombreProducto,
                empresa: req.user.sub
            }).exec((err, productoNoEncontrado) => {
                if (err) return console.log({ mensaje: 'Error en la peticion' });
                if (productoNoEncontrado.length >= 1) {
                    return res.status(500).send({ mensaje: "Este producto ya existe" });
                } else {
                    productoModel.save((err, productoGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                        if (productoGuardado) {
                            res.status(220).send({ productoGuardado }); //.send({mensaje: 'Producto guardado'});

                        } else {
                            res.status(500).send({ mensaje: 'Error al registrar producto' });
                        }
                    });
                }

            });
        } else {
            if (err) return res.status(500).send({ mensaje: 'No puede dejar espacios vacios' });
        }

    } else {
        return res.status(500).send({ mensaje: 'Solo la empresa puede registrar empleados' });
    }
}

// EDITAR PRODUCTOS
function EditarProductos(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
        return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    var idProducto = req.params.idProducto;
    var datos = req.body;

    Productos.findByIdAndUpdate( { _id: idProducto }, datos, { new: true }, (error, productoEditado) => {

        if (error) return res.status(500).send({ error: "Error en la peticion" });

        return res.status(200).send({ PRODUCTOS: productoEditado });
      }
    );
  }

  // ELIMINAR PRODUCTOS 
  function EliminarProductos(req, res) {

    if (req.user.rol !== "ROL_EMPRESA") {
      return res.status(500).send({ mensaje: "Solo la empresa tiene permisos" });
    }

    var idProd = req.params.idProducto;
  
    Productos.findByIdAndDelete(idProd, (error, productoEliminado) => {

      if (error) return res.status(500).send({ Error: "Error en la peticion para eliminar." });

      if (productoEliminado == 0)

        return res.status(500).send({ Error: "El producto  no existe." });
        return res.status(200).send({ PRODUCTOS: productoEliminado });

    });
  }

  



module.exports = {
    StockMayor,
    StockMenor,
    agregarProductos,
    obtenerProductos,
    EditarProductos,
    EliminarProductos,
    obtenerProductosId,
    BuscarPorNombre,
    BuscarProductoProveedor
}
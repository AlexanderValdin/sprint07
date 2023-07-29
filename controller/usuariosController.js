import { Usuario } from "../model/usuarios.js";
import { validateUser } from "../validator/validation.js";

//create user controller
export const crearUsuario = async (req, res) => {
  let response = {
    msg: "Creación de usuario",
    error: null,
    data: null,
  };
  try {
    const { nombre, balance } = req.body;
    const { error, value } = validateUser(req.body);
    if (error) {
      console.log(error);
      return res.send(error.details);
    }

    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.balance = balance;
    const model_result = await usuario.crearUsuario(usuario);
    if (model_result != null) response.data = model_result;
    else response.error = "Error al tratar de crear el usuario";
    console.log(value);
    res.send(response);
  } catch (error) {
    response.error = "Server internal error";
    res.status(500).send(response);
  }
};
//get all user controller
export const obtenerUsuarios = async (req, res) => {
  let response = {
    msg: "Obtener Usuarios",
    error: null,
    data: null,
  };
  try {
    const usuario = new Usuario();
    const model_result = await usuario.obtenerUsuarios();
    if (model_result != null) {
      if (model_result.length == 0) {
        response.error = `No hay usuarios en la base de datos`;
      }
      response.data = model_result;
    } else {
      response.error = "Error al tratar de obtener los usuarios";
    }
    res.json(model_result);
  } catch (error) {
    response.error = "Server internal error";
    res.status(500).send(response);
  }
};
//update user controller
export const actualizarUsuario = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  let response = {
    msg: "Actualizar usuario",
    error: null,
    data: null,
  };

  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      console.log(error);
      return res.send(error.details);
    }
    console.log(value);
    const usuario = new Usuario();
    const id_user = req.params.id;
    const { nombre, balance } = req.body;

    usuario.id_user = id_user;
    usuario.nombre = nombre;
    usuario.balance = balance;

    const model_result = await usuario.actualizarUsuario(usuario);
    console.log(model_result);
    if (model_result != null) response.data = model_result;
    else response.error = "Error al tratar de actualizar el usuario";
    res.send(response);
  } catch (error) {
    response.error = "Server internal error";
    res.status(500).send(response);
  }
};
//delete user controller
export const borrarUsuario = async (req, res) => {
  let response = {
    msg: "Borrar Usuario",
    error: null,
    data: null,
  };
  const id_user = req.params.id;

  if (id_user) {
    const usuario = new Usuario();
    usuario.id_user = id_user;
    const model_result = await usuario.borrarUsuario(usuario);
    console.log(model_result);
    if (model_result != null) response.data = model_result;
    else response.error = "Error al eliminar el usuario";
  } else {
    response.error = "Faltan parámetros";
  }
  res.send(response);
};

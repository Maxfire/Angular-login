const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res = response) => {
  let dbUsers = await Usuario.find();

  if (!dbUsers) {
    return res.status(400).json({
      ok: false,
      msg: "No existen usuarios en la Base de Datos",
    });
  }

  return res.json(dbUsers);
};

const getUserById = async (req, res = response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const selectUser = await Usuario.findById(id);

    if (!selectUser) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe en la Base de Datos",
      });
    }

    return res.json(selectUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const deletedUser = await Usuario.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe en la Base de Datos",
      });
    }

    return res.json({
      ok: true,
      msg: `El usuario ${deletedUser.name} ha sido borrado de la Base de Datos`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { password, email, name } = req.body;

  try {
    // Verificar que el usuario exista
    let usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    // Verificar que el email no esté en uso
    if (email && email !== usuario.email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }

      usuario.email = email;
    }

    // Actualizar el nombre si se envió uno nuevo
    if (name) {
      usuario.name = name;
    }

    // Actualizar la contraseña si se envió una nueva
    if (password) {
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
    }

    usuario = await usuario.save();

    return res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};

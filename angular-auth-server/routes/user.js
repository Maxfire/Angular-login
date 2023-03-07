const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, deleteUser, updateUser, getUserById } = require("../controllers/user");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Get all users
router.get("/", validarJWT, getUsers);

// Get user by id
router.get("/:id", validarJWT, getUserById);

// Delete a user
router.delete("/:id", validarJWT, deleteUser);

// Update a user
router.put(
  "/:id",
  validarJWT,
  [
    check("name", "El nombre debe ser una cadena de texto")
      .optional()
      .isString(),
    check("email", "El email debe ser una dirección de correo válida")
      .optional()
      .isEmail(),
    check("password", "La contraseña debe tener una longitud de 6").optional().isLength({ min: 6 }),
    validarCampos,
  ],
  updateUser
);

module.exports = router;

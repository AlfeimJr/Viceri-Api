const express = require("express");
const router = express.Router();
const {
  register,
  getUserByEmail,
  resetPassword,
} = require("../services/user.service");

// Rota para registrar usuário
router.post("/register", register);

// Rota para buscar usuário pelo email
router.get("/:email", getUserByEmail);

// Rota para redefinir senha
router.put("/redefinir-senha", resetPassword);

module.exports = router;

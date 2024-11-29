const express = require("express");
const router = express.Router();
const { getFormFields } = require("../services/form-fields.service");

// Rota para obter os campos do formulário
router.get("/", getFormFields);

module.exports = router;

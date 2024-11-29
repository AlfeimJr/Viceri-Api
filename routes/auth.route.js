const express = require("express");
const router = express.Router();
const {
  login,
  generateAuthCode,
  verifyCode,
} = require("../services/auth.service");
const { generateCaptcha } = require("../utils/generate-captcha");

// Rota para login
router.post("/login", login);

// Rota para gerar código de autenticação
router.post("/generate-auth-code", generateAuthCode);

// Rota para verificar código de autenticação
router.post("/verify-code", verifyCode);

// Rota para gerar captcha
router.post("/generate-captcha", (req, res) => {
  const captcha = generateCaptcha();
  res.status(200).json({ captcha });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  login,
  generateAuthCode,
  verifyCode,
} = require("../services/auth.service");
const { generateCaptcha } = require("../utils/generate-captcha");

router.post("/login", login);

router.post("/generate-auth-code", generateAuthCode);

router.post("/verify-code", verifyCode);

router.post("/generate-captcha", (req, res) => {
  const captcha = generateCaptcha();
  res.status(200).json({ captcha });
});

module.exports = router;

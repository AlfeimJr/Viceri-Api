const jwt = require("jsonwebtoken");
const { generateCode } = require("../utils/generate-code");
const { usuarios } = require("../utils/users");

const SECRET_KEY = process.env.SECRET_KEY || "sua_chave_secreta";
const TOKEN_EXPIRATION = "1h";
const verificacoesMultifator = {};

const AuthService = {
  findUserByEmailAndPassword: (email, senha) =>
    usuarios.find((user) => user.email === email && user.senha === senha),

  findUserByEmail: (email) => usuarios.find((user) => user.email === email),

  generateToken: (payload) =>
    jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION }),

  validateCaptcha: (captcha, captchaResposta) =>
    captcha && captcha === captchaResposta,
};

const login = (req, res) => {
  try {
    const { email, senha, captcha, captchaResposta } = req.body;

    if (!AuthService.validateCaptcha(captcha, captchaResposta)) {
      return res
        .status(400)
        .json({ code: "CAPTCHA_INVALIDO", message: "CAPTCHA inválido." });
    }

    const usuario = AuthService.findUserByEmailAndPassword(email, senha);
    if (!usuario) {
      return res
        .status(401)
        .json({ code: "USUARIO_INEXISTENTE", message: "Conta inexistente." });
    }

    const token = AuthService.generateToken({ email: usuario.email });
    res.status(200).json({ message: "Login efetuado com sucesso.", token });
  } catch (error) {
    console.error("Erro no login:", error.message);
    res
      .status(500)
      .json({ code: "ERRO_INTERNO", message: "Erro interno no servidor." });
  }
};

const generateAuthCode = (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        code: "EMAIL_OBRIGATORIO",
        message: "O campo email é obrigatório.",
      });
    }

    const usuario = AuthService.findUserByEmail(email);
    if (!usuario) {
      return res.status(404).json({
        code: "USUARIO_NAO_ENCONTRADO",
        message: "Usuário não encontrado.",
      });
    }

    const code = generateCode();
    verificacoesMultifator[email] = code;

    console.log(`Código de autenticação gerado para ${email}: ${code}`);
    res
      .status(200)
      .json({ message: `Código de autenticação gerado com sucesso: ${code}` });
  } catch (error) {
    console.error("Erro ao gerar código de autenticação:", error.message);
    res
      .status(500)
      .json({ code: "ERRO_INTERNO", message: "Erro interno no servidor." });
  }
};

const verifyCode = (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        code: "CAMPOS_OBRIGATORIOS",
        message: "Todos os campos são obrigatórios.",
      });
    }

    const correctCode = verificacoesMultifator[email];

    if (!correctCode || correctCode !== code) {
      return res.status(401).json({
        code: "CODIGO_INVALIDO",
        message: "Código de autenticação inválido.",
      });
    }

    delete verificacoesMultifator[email];

    const token = AuthService.generateToken({ email });
    res.status(200).json({
      message: "Autenticação multifator concluída com sucesso.",
      token,
    });
  } catch (error) {
    console.error("Erro ao verificar código:", error.message);
    res
      .status(500)
      .json({ code: "ERRO_INTERNO", message: "Erro interno no servidor." });
  }
};

module.exports = { login, generateAuthCode, verifyCode };

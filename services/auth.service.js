const jwt = require("jsonwebtoken");
const { generateCode } = require("../utils/generate-code");

const SECRET_KEY = "sua_chave_secreta";
const verificacoesMultifator = {};
const { usuarios } = require("../utils/users");
const login = (req, res) => {
  const { email, senha, captcha, captchaResposta } = req.body;

  if (captcha !== captchaResposta) {
    return res.status(400).json({ message: "CAPTCHA inválido." });
  }

  const usuario = usuarios.find(
    (user) => user.email === email && user.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({ message: "Conta inexistente" });
  }

  const token = jwt.sign({ email: usuario.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login efetuado com sucesso.", token });
};

const generateAuthCode = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      code: "EMAIL_OBRIGATORIO",
      message: "O campo email é obrigatório.",
    });
  }

  const usuario = usuarios.find((user) => user.email === email);

  if (!usuario) {
    return res.status(404).json({
      code: "USUARIO_NAO_ENCONTRADO",
      message: "Usuário não encontrado.",
    });
  }

  const code = generateCode();
  verificacoesMultifator[email] = code;

  console.log(`Código de autenticação gerado para ${email}: ${code}`);
  res.status(200).json({ message: `Código de autenticação: ${code}.` });
};

const verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({
      code: "CAMPOS_OBRIGATORIOS",
      message: "Todos os campos são obrigatórios.",
    });
  }

  const correctCode = verificacoesMultifator[email];

  if (correctCode !== code) {
    return res.status(401).json({
      code: "CODIGO_INVALIDO",
      message: "Código de autenticação inválido.",
    });
  }

  delete verificacoesMultifator[email];

  res.status(200).json({
    message: "Autenticação multifator concluída com sucesso.",
    token: "fake-jwt-token",
  });
};

module.exports = { login, generateAuthCode, verifyCode };

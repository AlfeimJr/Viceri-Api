const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "sua_chave_secreta";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: "TOKEN_NAO_FORNECIDO",
        message: "Token não fornecido ou malformado.",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.error("Erro ao verificar token:", err.message);
        return res.status(403).json({
          code: "TOKEN_INVALIDO",
          message: "Token inválido ou expirado.",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Erro interno ao autenticar token:", error.message);
    res.status(500).json({
      code: "ERRO_INTERNO",
      message: "Erro interno no servidor ao processar o token.",
    });
  }
};

module.exports = authenticateToken;

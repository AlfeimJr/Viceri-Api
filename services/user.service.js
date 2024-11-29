const { usuarios } = require("../utils/users");

const register =
  ("/register",
  (req, res) => {
    console.log("Requisição recebida no /register:", req.body);

    const { email, senha, captcha, captchaResposta } = req.body;

    if (!email || !senha || !captcha || !captchaResposta) {
      return res.status(400).json({
        code: "CAMPOS_OBRIGATORIOS",
        message: "Todos os campos são obrigatórios.",
      });
    }

    if (captcha !== captchaResposta) {
      return res.status(400).json({
        code: "CAPTCHA_INVALIDO",
        message: "CAPTCHA inválido. Tente novamente.",
      });
    }

    const usuarioExistente = usuarios.find((user) => user.email === email);
    if (usuarioExistente) {
      return res.status(409).json({
        code: "EMAIL_EXISTENTE",
        message: "E-mail já registrado. Tente outro.",
      });
    }

    // Registra o novo usuário
    const novoUsuario = {
      id: usuarios.length + 1,
      email,
      senha,
    };
    usuarios.push(novoUsuario);

    console.log("Novo usuário registrado:", novoUsuario);
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: novoUsuario,
    });
  });

const getUserByEmail =
  ("/usuario/:email",
  (req, res) => {
    console.log("Requisição recebida no /usuario:", req.params.email);

    const { email } = req.params;

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

    console.log("Usuário encontrado:", usuario);
    res.status(200).json({
      message: "Usuário encontrado com sucesso.",
      usuario,
    });
  });

const resetPassword =
  ("/usuario/redefinir-senha",
  (req, res) => {
    console.log("Requisição recebida no /usuario/redefinir-senha:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        code: "EMAIL_OBRIGATORIO",
        message: "O email é obrigatório.",
      });
    }

    const usuario = usuarios.find((user) => user.email === email);

    if (!usuario) {
      return res.status(404).json({
        code: "USUARIO_NAO_ENCONTRADO",
        message: "Usuário não encontrado.",
      });
    }

    const gerarSenha = () => {
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const tamanho = 8;
      return Array.from({ length: tamanho }, () =>
        caracteres.charAt(Math.floor(Math.random() * caracteres.length))
      ).join("");
    };

    const novaSenha = gerarSenha();
    usuario.senha = novaSenha;

    console.log("Nova senha gerada para o usuário:", usuario);
    res.status(200).json({
      message: "Senha redefinida com sucesso.",
      novaSenha,
    });
  });

module.exports = { register, getUserByEmail, resetPassword };

const generateCaptcha = () => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tamanho = 6;
  return Array.from({ length: tamanho }, () =>
    caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  ).join("");
};

module.exports = { generateCaptcha };

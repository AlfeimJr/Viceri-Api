const app = require("./app");

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${BASE_URL} ${PORT}`);
});

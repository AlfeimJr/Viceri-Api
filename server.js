const app = require("./app");

const PORT = process.env.PORT || 3000; // Render fornece a porta via process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

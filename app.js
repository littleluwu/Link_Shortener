const express = require("express");
const cors = require("cors");

// Routes
const shortenerRoutes = require("./routes/shortener");
const redirectRoutes = require("./routes/redirect");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Definindo as rotas
app.use("/shorten", shortenerRoutes);
app.use("/r", redirectRoutes);

app.listen(PORT, () => {
  console.log(`Microserviço rodando na porta ${PORT}`);
});

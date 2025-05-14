const express = require("express");
const path = require("path");
const app = express();

// Configura o middleware para arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal ("/") redireciona para /login
app.get("/", (req, res) => {
    res.redirect("/login"); // Redireciona para a rota /login
});

// Rota /login → envia o arquivo login.html
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

module.exports=app
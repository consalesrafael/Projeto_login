const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser")
// Configura o middleware para arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.redirect("/login")
})
// Rota /login  envia o arquivo login.html
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.post("/criarUsuario", (req,res)=>{
    const {usuario,email, senha}= req.body

    console.log(`Nome: ${usuario}, Email: ${email}, Senha: ${senha}`);

    const sql = 'insert into'

})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

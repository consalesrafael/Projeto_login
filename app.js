const express = require("express");
const path = require("path");
const app = express();
const usuario= require("./database/usuario") 
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/criarUsuario", async (req, res) => {
    const nome = req.body.usuarioN
    const email = req.body.emailN
    const senha = req.body.senhaN

    usuario.create({
        nome: nome,
        email: email,
        senha: senha
    }).then(()=>{
        res.render("/login")
    })
    
});



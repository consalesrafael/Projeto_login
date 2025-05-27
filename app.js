const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require('bcrypt');
const db = require("./config");
const usuario= require("./config/usuario") 
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

app.post('/validaUsuario', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const usuarioDB = rows[0];

        const senhaValida = await bcrypt.compare(senha, usuarioDB.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        res.json({
            message: "Login bem-sucedido!",
            usuario: {
                id: usuarioDB.id,
                nome: usuarioDB.usuario,
                usuario: usuarioDB.email
            }
        });

    } catch (error) {
        console.error("Erro ao validar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

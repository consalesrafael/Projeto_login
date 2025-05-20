const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require('bcrypt');
const db = require("./config/banco"); 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/criarUsuario", async (req, res) => {
    const { usuario, email, senha } = req.body;

    try {
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const sql = 'INSERT INTO usuarios (usuario, email, senha_hash) VALUES (?, ?, ?)';
        await db.query(sql, [usuario, email, senhaHash]);

        res.status(201).json({ message: "Usuário criado com sucesso!" });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email já cadastrado!" });
        }

        res.status(500).json({ error: "Erro interno no servidor" });
        console.error('Erro completo:', error);
    }
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

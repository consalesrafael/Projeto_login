const express = require("express");
const path = require("path");
const app = express();
const usuario = require("./database/usuario")
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login")
});
 app.get("/crud",(req,res)=>{
    usuario.findAll({raw: true}).then(usuarios=>{
        res.render("crud",{
            usuario: usuarios
        })
    })
    
 })

app.post("/criarUsuario", async (req, res) => {
    const nome = req.body.usuarioN;
    const email = req.body.emailN;
    const senha = req.body.senhaN;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    try {
        const usuarioExistente = await usuario.findOne({ where: { email: email } });

        if (!usuarioExistente) {
            await usuario.create({ nome, email, senha: hash }); 
            res.redirect("/login");
        } else {
            res.send("<script>alert('E-mail já existe!'); window.location.href='/login';</script>");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar usuário");
    }
});

app.post("/validaUsuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    try {
        const usuarioExistente = await usuario.findOne({ where: { email: email } });

        if (usuarioExistente) {
            const senhaCorreta = bcrypt.compareSync(senha, usuarioExistente.senha);

            if (senhaCorreta) {

                res.redirect("/crud")
            } else {
                return res.send("<script>alert('Senha ou email incorretos'); window.location.href='/crud';</script>");
            }
        } else {
            return res.send("<script>alert('Usuário não encontrado'); window.location.href='/login';</script>");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erro interno do servidor");
    }
});


app.listen(3000, () => {
    console.log("Servidor aberto em 3000")

})


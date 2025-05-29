const Sequelize = require("sequelize")

const connection = new Sequelize('projeto_login','root','root',{
  host: 'localHost',
  dialect:'mysql',
  port: 3307
});
connection
        .authenticate()
        .then(()=>{
          console.log("Conexao feita com o db")
        })
        .catch((msgErro)=>{
          console.log("msgErro")
        })
        
module.exports = connection;
const Sequelize = require("sequelize")

const connection = new Sequelize('projeto_login','root','root',{
  host: 'localhost',
  dialect:'mysql'
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
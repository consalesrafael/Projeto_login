const mysql = require("mysql2")

const db = mysql.createConnection({
  host: 'localhost',      
  user: 'root',          
  password: 'root',       
  database: 'projeto_login'
});


db.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = db;
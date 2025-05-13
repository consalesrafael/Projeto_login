const { Sequelize } = require('sequelize');

const db = new Sequelize('login', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});


db.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = db;
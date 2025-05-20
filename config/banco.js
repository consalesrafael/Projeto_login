const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'projeto_login',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao MySQL!');
    connection.release();
  } catch (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  }
})();

module.exports = pool;
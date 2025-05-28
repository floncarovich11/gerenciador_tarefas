const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gerenciador_de_tarefas',
    port: 3307,
});
module.exports = connection;
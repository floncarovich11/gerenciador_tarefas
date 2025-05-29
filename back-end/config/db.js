const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gerenciador_de_tarefas',
    port: 3306,
});
module.exports = connection;
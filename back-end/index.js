const db = require('./config/db.js');
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tarefasRoutes = require('./routes/tarefas');

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Removido a barra no final
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Corrigido os métodos
    credentials: true, // Allow cookies to be sent
}));

db.connect((err) => {
    if (err) throw err;
    console.log('Conexão com o banco de dados estabelecida');
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);
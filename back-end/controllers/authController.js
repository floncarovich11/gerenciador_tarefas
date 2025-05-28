const db = require('../config/db');

exports.register = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ err: 'Todos os campos são obrigatórios.' });
    }

    db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
        [nome, email, senha], 
        (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Usuário registrado com sucesso.' });
        }
    );
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query(
        'SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
            if(err || results.length === 0) {
                return res.status(401).send({ message: 'Falha na autenticação' });
            }
            const usuario = results[0];

            if (usuario.senha !== senha) {
                return res.status(401).send({ message: 'Senha incorreta' });
            }
            res.status(200).send({ 
                message: 'Login bem-sucedido', 
                usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } 
            });
        }
    )
} 
const db = require('../config/db.js');

exports.createTarefa = (req, res) => {
    const { usuario_id, descricao, setor, prioridade, data_cadastro } = req.body;
    const status = 'A fazer'; // ✅ Define fixamente aqui

    if (!usuario_id || !descricao || !setor || !prioridade || !data_cadastro) {
        return res.status(400).send({ err: 'Todos os campos são obrigatórios.' });
    }

    db.query(
        'INSERT INTO tarefas (usuario_id, descricao, setor, prioridade, data_cadastro, status) VALUES (?, ?, ?, ?, ?, ?)', 
        [usuario_id, descricao, setor, prioridade, data_cadastro, status], 
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Tarefa criada com sucesso.',
                tarefa: { usuario_id, descricao, setor, prioridade, data_cadastro, status }
             });
        }
    );
}

exports.getTarefas = (req, res) => {
    const { usuario_id } = req.query;

    let query = 'SELECT tarefas.*, usuarios.nome as nome_usuario FROM tarefas LEFT JOIN usuarios ON tarefas.usuario_id = usuarios.id';
    let params = [];

    if (usuario_id) {
        query += ' WHERE usuario_id = ?';
        params.push(usuario_id);
    }

    query += ' ORDER BY data_cadastro DESC';

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};


exports.updateTarefa = (req, res) => {
    const { descricao, setor, prioridade, data_cadastro, status } = req.body;

    if (!descricao || !setor || !prioridade || !data_cadastro || !status) {
        return res.status(400).send({ err: 'Todos os campos são obrigatórios.' });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ err: 'ID da tarefa inválido.' });
    }

    db.query(
        'UPDATE tarefas SET descricao = ?, setor = ?, prioridade = ?, data_cadastro = ?, status = ? WHERE id = ?',
        [descricao, setor, prioridade, data_cadastro, status, id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) {
                return res.status(404).send({ message: 'Tarefa não encontrada.' });
            }
            res.status(200).send({ message: 'Tarefa atualizada com sucesso.' });
        }
    );
}

exports.deleteTarefa = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ err: 'ID da tarefa é obrigatório.' });
    }

    db.query(
        'DELETE FROM tarefas WHERE id = ?',
        [id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: 'Tarefa deletada com sucesso.' });
        }
    );
}

exports.getTarefaById = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ err: 'ID da tarefa inválido.' });
    }

    db.query(
        'SELECT * FROM tarefas WHERE id = ?',
        [id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) {
                return res.status(404).send({ message: 'Tarefa não encontrada.' });
            }
            res.status(200).send(results[0]);
        }
    );
};

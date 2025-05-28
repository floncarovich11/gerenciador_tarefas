const db = require('../config/db.js');

exports.createTarefa = (req, res) => {
    const { usuario_id, descricao, setor, prioridade, data_cadastro, status} = req.body;

    if (!usuario_id || !descricao || !setor || !prioridade || !data_cadastro || !status) {
        return res.status(400).send({ err: 'Todos os campos são obrigatórios.' });
    }

    db.query(
        'INSERT INTO tarefas (usuario_id, descricao, setor, prioridade, data_cadastro, status) VALUES (?, ?, ?, ?, ?, ?)', 
        [usuario_id, descricao, setor, prioridade, data_cadastro, status], 
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Tarefa criada com sucesso.' });
        }
    );
}

exports.getTarefas = (req, res) => {
    const { usuario_id } = req.body;
    if (!usuario_id) {
        return res.status(400).send({ err: 'ID do usuário é obrigatório.' });
    }
    db.query(
        'SELECT * FROM tarefas WHERE usuario_id = ? ORDER BY data_cadastro DESC',
        [usuario_id],
        (error, results) => {
            if (error) return res.status(500).send(error);
            res.status(200).send(results);
        }
    );
}

exports.updateTarefa = (req, res) => {
    const { descricao, setor, prioridade, data_cadastro, status } = req.body;

    if (!descricao || !setor || !prioridade || !data_cadastro || !status) {
        return res.status(400).send({ err: 'Todos os campos são obrigatórios.' });
    }

    db.query(
        'UPDATE tarefas SET descricao = ?, setor = ?, prioridade = ?, data_cadastro = ?, status = ?',
        [descricao, setor, prioridade, data_cadastro, status, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
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
        (error) => {
            if (error) return res.status(500).send(err);
            res.status(200).send({ message: 'Tarefa deletada com sucesso.' });
        }
    );
}

exports.getTarefaById = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({ err: 'ID da tarefa é obrigatório.' });
    }

    db.query(
        'SELECT * FROM tarefas WHERE id = ?',
        [id],
        (error, results) => {
            if (error) return res.status(500).send(error);
            if (results.length === 0) {
                return res.status(404).send({ message: 'Tarefa não encontrada.' });
            }
            res.status(200).send(results[0]);
        }
    );
}
const express = require('express');
const router = express.Router();
const { createTarefa, getTarefas, updateTarefa, deleteTarefa, getTarefaById } = require('../controllers/tarefasController');

router.post('/', createTarefa);
router.get('/', getTarefas);
router.get('/:id', getTarefaById);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

module.exports = router;
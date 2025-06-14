export const criarTarefa = async ({ usuario_id, descricao, setor, prioridade, data_cadastro }) => {
  try {
    const payload = {
      usuario_id: parseInt(usuario_id), // Certifique-se de que é um número
      descricao,
      setor,
      prioridade,
      data_cadastro,
    };

    console.log("📦 Dados enviados para criação:", payload);
    return await axios.post('http://localhost:3000/tarefas/', payload);
  } catch (err) {
    console.error('❌ Erro ao criar tarefa:', err.response?.data || err.message);
    throw err;
  }
};

export const listarTarefas = async (usuario_id) => {
  try {
    const url = usuario_id
      ? `http://localhost:3000/tarefas?usuario_id=${usuario_id}`
      : 'http://localhost:3000/tarefas';

    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("Erro ao listar tarefas:", err);
    throw err;
  }
};

export const editarTarefa = async (id, { descricao, setor, prioridade, data_cadastro, status }) => {
  try {
    return await axios.put(`http://localhost:3000/tarefas/${id}`, {
      descricao,
      setor,
      prioridade,
      data_cadastro,
      status,
    });
  } catch (err) {
    console.error('Erro ao editar tarefa:', err);
    throw err;
  }
};

export const deletarTarefa = async (id) => {
  try {
    return await axios.delete(`http://localhost:3000/tarefas/${id}`);
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
    throw err;
  }
};

export const buscarTarefaPorId = async (id) => {
  try {
    return await axios.get(`http://localhost:3000/tarefas/${id}`);
  } catch (err) {
    console.error('Erro ao obter tarefa por ID:', err);
    throw err;
  }
};

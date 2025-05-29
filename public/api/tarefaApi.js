export const criarTarefa = async ({ descricao, setor, prioridade, data_cadastro }) => {
    try {
      const usuario_id = localStorage.getItem('usuario_id');
      const payload = {
        usuario_id: parseInt(usuario_id), // se for número no backend
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
        return await axios.get('http://localhost:3000/tarefas/', {
            params: { usuario_id } // Usa o usuario_id passado como argumento
        });
    } catch (err) {
        console.error('Erro ao listar tarefas:', err);
        throw err;
    }
}

export const editarTarefa = async (descricao, setor, prioridade, data_cadastro, status) => {
    try {
        return await axios.put(`http://localhost:3000/tarefas/${id}`, {
            descricao,
            setor,
            prioridade,
            data_cadastro,
            status
        });
    } catch (err) {
        console.error('Erro ao editar tarefa:', err);
        throw err;
    }
}

export const deletarTarefa = async (id) => {
    try {
        return await axios.delete(`http://localhost:3000/tarefas/${id}`);
    } catch (err) {
        console.error('Erro ao deletar tarefa:', err);
        throw err;
    }
}

export const buscarTarefaPorId = async (id) => {
    try {
        return await axios.get(`http://localhost:3000/tarefas/${id}`);
    } catch (err) {
        console.error('Erro ao obter tarefa por ID:', err);
        throw err;
    }
}


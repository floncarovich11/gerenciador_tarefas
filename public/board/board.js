import { criarTarefa, listarTarefas, editarTarefa, buscarTarefaPorId, deletarTarefa } from "../api/tarefaApi.js"; // ajuste o caminho conforme seu projeto

document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");
  const modalAdicionar = document.getElementById("modalAdicionar");
  const btnFecharModal = modalAdicionar.querySelector(".fechar");
  const form = document.getElementById("criarTarefaForm");

  btnAdicionarTarefa.addEventListener("click", () => {
    modalAdicionar.style.display = "block";
  });

  btnFecharModal.addEventListener("click", () => {
    modalAdicionar.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modalAdicionar) {
      modalAdicionar.style.display = "none";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario_id = localStorage.getItem("usuario_id"); // Recupera o usuario_id do localStorage
    const descricao = document.getElementById("inputDescricao").value.trim();
    const setor = document.getElementById("inputSetor").value.trim();
    const prioridade = document.getElementById("inputPrioridade").value.trim();
    const data_cadastro = new Date().toISOString().split("T")[0];

    if (!usuario_id) {
      alert("Erro: ID do usuário não encontrado. Faça login novamente.");
      return;
    }

    if (!descricao || !setor || !prioridade) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      console.log("Dados da tarefa a serem criados:", {
        usuario_id,
        descricao,
        setor,
        prioridade,
        data_cadastro,
      }
      )
      const novaTarefa = await criarTarefa({
        usuario_id,
        descricao,
        setor,
        prioridade,
        data_cadastro,
      });

      alert("Tarefa criada com sucesso!");
      modalAdicionar.style.display = "none";

      // Atualize a lista de tarefas conforme necessário
      listarTarefas(usuario_id);

    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Ocorreu um erro ao tentar criar a tarefa.");
    }
  });
});



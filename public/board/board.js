import { criarTarefa, listarTarefas, editarTarefa, deletarTarefa } from "../api/tarefaApi.js";
import { getUsuarios } from "../api/authApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const modalEditar = document.getElementById("modalEditar");
  const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");
  const modalAdicionar = document.getElementById("modalAdicionar");
  const btnFecharModal = modalAdicionar.querySelector(".fechar");
  const form = document.getElementById("criarTarefaForm");
  const selectUsuario = document.getElementById("selectUsuario");

  // Abrir modal de adicionar
  btnAdicionarTarefa.addEventListener("click", () => {
    modalAdicionar.style.display = "block";
  });

  // Fechar modal de adicionar
  btnFecharModal.addEventListener("click", () => {
    modalAdicionar.style.display = "none";
  });

  // Fechar modais clicando fora
  window.addEventListener("click", (event) => {
    if (event.target === modalAdicionar) {
      modalAdicionar.style.display = "none";
    } else if (event.target === modalEditar) {
      modalEditar.style.display = "none";
    }
  });

  // Submissão do formulário de criação
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario_id = selectUsuario.value;
    const descricao = document.getElementById("inputDescricao").value.trim();
    const setor = document.getElementById("inputSetor").value.trim();
    const prioridade = document.getElementById("inputPrioridade").value.trim();
    const data_cadastro = new Date().toISOString().split("T")[0];

    if (!descricao || !setor || !prioridade || !usuario_id) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await criarTarefa({
        usuario_id,
        descricao,
        setor,
        prioridade,
        data_cadastro,
      });

      alert("Tarefa criada com sucesso!");
      modalAdicionar.style.display = "none";
      form.reset();
      selectUsuario.selectedIndex = 0;
      await carregarTarefas(usuario_id);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Ocorreu um erro ao tentar criar a tarefa.");
    }

  });

  // Fechar modal de edição
  const btnFecharEditar = modalEditar.querySelector(".fechar-editar");
  btnFecharEditar.addEventListener("click", () => {
    modalEditar.style.display = "none";
  });

  async function carregarUsuarios() {
    try {
      const response = await getUsuarios();
      const usuarios = response.data;

      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = usuario.nome;
        selectUsuario.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários.");
    }
  }

  async function carregarTarefas(usuario_id) {
    try {
      const tarefas = await listarTarefas(usuario_id);

      const colunas = {
        aFazer: document.querySelector("#colunaAFazer"),
        emAndamento: document.querySelector("#colunaFazendo"),
        concluido: document.querySelector("#colunaPronto"),
      };

      Object.values(colunas).forEach((coluna) => {
        coluna.innerHTML = "";
      });

      tarefas.forEach((tarefa) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <p><strong>Descrição:</strong> <span class="descricao">${tarefa.descricao}</span></p>
          <p><strong>Setor:</strong> <span class="setor">${tarefa.setor}</span></p>
          <p><strong>Data de Cadastro:</strong> <span class="data">${tarefa.data_cadastro}</span></p>
          <p><strong>Prioridade:</strong> <span class="prioridade">${tarefa.prioridade}</span></p>
          <p><strong>Status:</strong> <span class="status">${tarefa.status}</span></p>
          <p><strong>Responsável:</strong> ${tarefa.nome_usuario}</p>

          <button class="editar-btn" data-id="${tarefa.id}">Editar</button>
          <button class="deletar-btn" data-id="${tarefa.id}">Deletar</button>
          
        `;

        colunas[tarefa.status]?.appendChild(card);

        const btnEditar = card.querySelector(".editar-btn");
        btnEditar.addEventListener("click", async () => {
          try {
            const response = await axios.get(`http://localhost:3000/tarefas/${tarefa.id}`);
            const dados = response.data;

            document.getElementById("editarId").value = dados.id;
            document.getElementById("editarDescricao").value = dados.descricao;
            document.getElementById("editarSetor").value = dados.setor;
            document.getElementById("editarPrioridade").value = dados.prioridade;
            document.getElementById("editarStatus").value = dados.status;

            modalEditar.style.display = "block";
          } catch (error) {
            console.error("Erro ao buscar tarefa:", error);
            alert("Erro ao buscar tarefa para edição.");
          }
        });

        const btnDeletar = card.querySelector(".deletar-btn");
        btnDeletar.addEventListener("click", async () => {
          if (confirm("Você tem certeza que deseja deletar esta tarefa?")) {
            try {
              await deletarTarefa(tarefa.id);
              alert("Tarefa deletada com sucesso!");
              modalEditar.style.display = "none";
              await carregarTarefas(selectUsuario.value);
            } catch (error) {
              console.error("Erro ao deletar tarefa:", error);
              alert("Ocorreu um erro ao tentar deletar a tarefa.");
            }
          }
        });
      });
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      alert("Erro ao carregar tarefas.");
    }
  }

  // Submissão do formulário de edição
  document.getElementById("editarTarefaForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("editarId").value;
    const descricao = document.getElementById("editarDescricao").value.trim();
    const setor = document.getElementById("editarSetor").value.trim();
    const prioridade = document.getElementById("editarPrioridade").value.trim();
    const status = document.getElementById("editarStatus").value.trim();
    const data_cadastro = new Date().toISOString().split("T")[0];

    try {
      await editarTarefa(id, {
        descricao,
        setor,
        prioridade,
        data_cadastro,
        status,
      });

      alert("Tarefa editada com sucesso!");
      modalEditar.style.display = "none";
      await carregarTarefas(selectUsuario.value);
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      alert("Ocorreu um erro ao tentar editar a tarefa.");
    }
  });

  carregarTarefas();
  // Inicializar com o primeiro usuário da lista após carregar usuários
carregarUsuarios();
});

import { criarTarefa, listarTarefas, editarTarefa } from "../api/tarefaApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const modalEditar = document.getElementById("modalEditar");
  const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");
  const modalAdicionar = document.getElementById("modalAdicionar");
  const btnFecharModal = modalAdicionar.querySelector(".fechar");
  const form = document.getElementById("criarTarefaForm");

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

    const usuario_id = localStorage.getItem("usuario_id");
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
      await carregarTarefas(usuario_id);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Ocorreu um erro ao tentar criar a tarefa.");
    }
  });

  const usuario_id = localStorage.getItem("usuario_id");
  if (usuario_id) {
    carregarTarefas(usuario_id);
  } else {
    alert("Usuário não autenticado.");
  }

  // Fechar modal de edição
  const btnFecharEditar = modalEditar.querySelector(".fechar-editar");
  btnFecharEditar.addEventListener("click", () => {
    modalEditar.style.display = "none";
  });

  // Submissão do formulário de edição
  document.getElementById("editarTarefaForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Submetendo formulário de edição...");

    const id = document.getElementById("editarId").value;
    const descricao = document.getElementById("editarDescricao").value.trim();
    const setor = document.getElementById("editarSetor").value.trim();
    const prioridade = document.getElementById("editarPrioridade").value.trim();
    const status = document.getElementById("editarStatus").value.trim();
    const data_cadastro = new Date().toISOString().split("T")[0];

    console.log(id, descricao, setor, prioridade, status, data_cadastro);

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
      document.getElementById("modalEditar").style.display = "none";
      await carregarTarefas(usuario_id);
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      alert("Ocorreu um erro ao tentar editar a tarefa.");
    }
  });
});

async function carregarTarefas(usuario_id) {
  try {
    const tarefas = await listarTarefas(usuario_id);
    const lista = document.querySelector(".card_list");
    lista.innerHTML = "";

    tarefas.forEach((tarefa) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <p><strong>Descrição:</strong> <span class="descricao">${tarefa.descricao}</span></p>
        <p><strong>Setor:</strong> <span class="setor">${tarefa.setor}</span></p>
        <p><strong>Data de Cadastro:</strong> <span class="data">${tarefa.data_cadastro}</span></p>

        <label><strong>Prioridade:</strong>
          <select disabled>
            <option value="baixa" ${tarefa.prioridade === "baixa" ? "selected" : ""}>Baixa</option>
            <option value="media" ${tarefa.prioridade === "media" ? "selected" : ""}>Média</option>
            <option value="alta" ${tarefa.prioridade === "alta" ? "selected" : ""}>Alta</option>
          </select>
        </label>

        <label><strong>Status:</strong>
          <select disabled>
            <option value="aFazer" ${tarefa.status === "aFazer" ? "selected" : ""}>A fazer</option>
            <option value="fazendo" ${tarefa.status === "fazendo" ? "selected" : ""}>Fazendo</option>
            <option value="pronto" ${tarefa.status === "pronto" ? "selected" : ""}>Pronto</option>
          </select>
        </label>

        <button class="editar-btn" data-id="${tarefa.id}">✏️ Editar</button>
      `;

      lista.appendChild(card);

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
    });
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
    alert("Erro ao carregar tarefas.");
  }
}
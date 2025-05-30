import { register } from '../api/authApi.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarSenhaInput.value.trim();

        try {
            if (!nome || !email || !senha || !confirmarSenha) {
                alert("Todos os campos são obrigatórios.");
                return;
            }

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem.");
                return;
            }

            const response = await register(nome, email, senha);
            if (response.data) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "../board/board.html"; // Redireciona para a página de login após o cadastro
            } else {
                alert("Erro ao cadastrar: " + response.message);
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente mais tarde.");
        }
    });
});

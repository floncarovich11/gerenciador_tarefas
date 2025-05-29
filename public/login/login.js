import { login } from "../api/authApi.js";

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        try {
            if (!email || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const response = await login(email, senha);
            // console.log("Retorno completo da API de login:", response); // Adicionado para depuração
            // console.log("Retorno da API de login (data):", response.data); // Adicionado para depuração
            const data = response.data;

            if (!data || !data.usuario || !data.usuario.id) {
                alert("Erro: ID do usuário não encontrado no retorno do login.");
                return;
            }

            localStorage.setItem("usuario_id", data.usuario.id); // Armazena o ID do usuário no localStorage

            alert(data.message);
            window.location.href = "../board/board.html";

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        }
    });
});
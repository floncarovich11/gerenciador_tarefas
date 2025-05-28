CREATE DATABASE gerenciador_de_tarefas;

USE gerenciador_de_tarefas;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255)
);

-- Tabela de tarefas
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, 
    descricao TEXT NOT NULL, 
    setor VARCHAR(100) NOT NULL,
    prioridade ENUM('baixa', 'media', 'alta') NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('a fazer', 'fazendo', 'pronto') DEFAULT 'a fazer',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


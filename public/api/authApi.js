export const login = async (email, senha) => {
    try {
        return await axios.post('http://localhost:3000/auth/login', {
            email,
            senha
                });
    } catch (err) {
        console.error('Erro durante o login:', err);
        throw err;
    }
}

export const register = async (nome, email, senha) => {
    try {
        return await axios.post('http://localhost:3000/auth/register', {
            nome,
            email,
            senha
        });
    } catch (err) {
        console.error('Erro durante o registro:', err);
        throw err;
    }
}

export const getUsuarios = async () => {
    try {
        return await axios.get('http://localhost:3000/auth/usuarios');
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        throw err;
    }
}
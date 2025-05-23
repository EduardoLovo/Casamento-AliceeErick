import axios from 'axios';
import { JwtHandler } from './jwt_handler';

export const Api = {
    // baseUrl: 'https://casamento-api-seven.vercel.app',
    baseUrl: 'http://localhost:3000',

    // Rota Login
    loginUrl: () => `${Api.baseUrl}/auth/login`,
    registerUrl: () => `${Api.baseUrl}/auth/register`,

    // Rotas
    readAllUrl: (rota) => Api.baseUrl + `/${rota}`,
    addUrl: (rota) => Api.baseUrl + `/${rota}/`,
    readByIdUrl: (rota, id) => Api.baseUrl + `/${rota}/` + id,
    updateUrl: (rota, id) => Api.baseUrl + `/${rota}/` + id,
    deleteUrl: (rota, id) => Api.baseUrl + `/${rota}/` + id,

    listAllConfirmedsUrl: (rota) =>
        Api.baseUrl + `/${rota}/lista-de-confirmados`,

    // Configuração do token para requisições autenticadas
    authConfig: () => {
        const token = JwtHandler.getJwt();
        if (!token || !JwtHandler.isJwtValid()) {
            throw new Error('Token JWT não encontrado');
        }

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    },
};

// Só agora crie a instância do axios e os métodos que usam ela
Api.instance = axios.create({
    baseURL: Api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Métodos que usam a instance
Api.get = (url, auth = false) =>
    Api.instance.get(url, auth ? Api.authConfig() : {});
Api.post = (url, body, auth = false) => {
    const config = auth ? Api.authConfig() : {};
    return Api.instance.post(url, body, config);
};
Api.patch = (url, body, auth = false) => {
    const config = auth ? Api.authConfig() : {};
    return Api.instance.patch(url, body, config);
};
Api.delete = (url, auth = false) =>
    Api.instance.delete(url, auth ? Api.authConfig() : {});

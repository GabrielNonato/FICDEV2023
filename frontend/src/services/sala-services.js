import { api } from "./api";

export async function getFiltroSalas(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/sala/filtro/${data.capacidade}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSalas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteSala(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/sala/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateSala(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/sala/update/${data.id}`, {
        nome: data.nomeSala,
        departamento: data.departamentoSala,
        capacidade: data.capacidadeSala
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createSala(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/sala/create', {
        nome: data.nomeSala,
        departamento: data.departamentoSala,
        capacidade: data.capacidadeSala
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function salasAnalisadas(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/sala/quantidade`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
import { api } from "./api";

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
        name: data.namesala,
        email: data.emailsala
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
        name: data.namesala,
        email: data.emailsala
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

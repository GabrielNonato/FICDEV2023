import { api } from './api'

export async function getUsuario(id){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/usuario/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }        
    });
    return result;
}

export async function signupUsuario(data) {
    const result = await api.post('/usuario/signup', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('idUsuario', JSON.stringify(result.data.idUsuario));
}

export async function loginUsuario(data) {
    const result = await api.post('/usuario/signin', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('idUsuario', JSON.stringify(result.data.idUsuario));
}

export async function updateUsuario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/usuario/update/${data.id}`, {
        nome: data.nomeUsuario,
        email: data.emailUsuario,
        senha: data.senhaUsuario
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteUsuario(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/usuario/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
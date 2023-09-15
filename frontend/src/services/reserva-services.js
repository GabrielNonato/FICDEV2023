import { api } from "./api";

export async function getReservas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/reservas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteReserva(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/reserva/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateReserva(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/reserva/update/${data.id}`, {
        nomeResponsavel: data.nomeResponsavel,
        dia: data.diaReserva,
        horarioInicio: data.horarioInicio,
        horarioFim: data.horarioFim,
        SalaId: data.idSala,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createReserva(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/reserva/create', {
        nomeResponsavel: data.nomeResponsavel,
        dia: data.diaReserva,
        horarioInicio: data.horarioInicio,
        horarioFim: data.horarioFim,
        SalaId: data.idSala,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
const { ReservaModel } = require('../../models/reserva-model');
const { HttpHelper } = require('../../utils/http-helper');

class CreateReservaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomeResponsavel,dia, horarioInicio, horarioFim,SalaId } = request.body;

            if (!nomeResponsavel || !dia || !horarioInicio || !horarioFim || !SalaId ) return httpHelper.badRequest('Parâmetros inválidos!');
            if(horarioFim==horarioInicio || horarioFim<horarioInicio) return httpHelper.badRequest('Parâmetros inválidos!');
            const verificarReservas = await ReservaModel.findAll();
            
            let tamanho = verificarReservas.length
            
            for(let i = 0;i<tamanho;i++){
                if(verificarReservas[i].dia==dia && verificarReservas[i].SalaId == SalaId){
                    if(horarioFim > verificarReservas[i].horarioInicio && horarioInicio<verificarReservas[i].horarioFim ){
                        return httpHelper.badRequest('Horário já reservado!');
                    }
                }
            }         
            
            const reserva = await ReservaModel.create({
                nomeResponsavel,dia,horarioInicio,horarioFim,SalaId
            });

            return httpHelper.created(reserva);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new CreateReservaController();
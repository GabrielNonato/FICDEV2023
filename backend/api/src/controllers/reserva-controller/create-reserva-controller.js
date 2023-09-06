const { ReservaModel } = require('../../models/reserva-model');
const { HttpHelper } = require('../../utils/http-helper');

class CreateReservaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomeResponsavel,dia, horarioInicio, horarioFim,idSala } = request.body;

            if (!nomeResponsavel || !dia || !horarioInicio || !horarioFim || !idSala ) return httpHelper.badRequest('Parâmetros inválidos!');

            const reserva = await ReservaModel.create({
                nomeResponsavel,dia,horarioInicio,horarioFim,idSala
            });

            return httpHelper.created(reserva);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new CreateReservaController();

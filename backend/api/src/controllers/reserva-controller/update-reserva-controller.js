const { ReservaModel } = require('../../models/reserva-model');
const { HttpHelper } = require('../../utils/http-helper');

class UpdateReservaController {
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nomeResponsavel, dia, horarioInicio, horarioFim,SalaId } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!nomeResponsavel) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!dia) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!horarioInicio) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!horarioFim) return httpHelper.badRequest('Parâmetros inválidos!');

            const reservaExists = await ReservaModel.findByPk(id);
            
            if (!reservaExists) return httpHelper.notFound('Reserva não encontrada');
            await ReservaModel.update({
                nomeResponsavel, dia, horarioInicio,horarioFim,SalaId
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Reserva atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new UpdateReservaController();

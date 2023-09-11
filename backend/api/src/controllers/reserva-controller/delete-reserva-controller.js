const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');

class DeleteReservaController {
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const reservaExists = await ReservaModel.findOne({ where: { id } });
            if (!reservaExists) return httpHelper.notFound('Reserva não encontrada!');
            await ReservaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Reserva deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new DeleteReservaController();
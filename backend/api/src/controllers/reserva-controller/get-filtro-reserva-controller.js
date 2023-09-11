const { Op } = require("sequelize");
const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');

class GetFiltroReservaController {
    async getDia(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { dia } = request.params;
            if (!dia) return httpHelper.badRequest('Parâmetros inválidos!');
            const reserva = await ReservaModel.findAll({
                where: {
                    dia: {
                        [Op.eq]: dia
                    }
                }
            });
            return httpHelper.ok(reserva);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetFiltroReservaController();
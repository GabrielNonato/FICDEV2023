const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');
const { Op } = require("sequelize");

class GetAnoReservaController {
       
    async getAnoReservas(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const dataAtual = new Date()
            const dataAno = dataAtual.getFullYear();
            const dataComparada = dataAno+'-01-01'

            const reservas = await ReservaModel.findAll({
                where: {
                    dia: {
                        [Op.gte]: dataComparada
                    }
                }
            });

            return httpHelper.ok(reservas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetAnoReservaController();
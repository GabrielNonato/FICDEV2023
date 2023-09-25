const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');
const { Op } = require("sequelize");

class GetTrimestreUmReservaController {
       
    async getTrimestreUmReservas(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const dataAtual = new Date()
            const dataAno = dataAtual.getFullYear();
            const dataComparada = dataAno+'-04-01'
            const dataComparada2 = dataAno+'-01-01'

            const reservas = await ReservaModel.count({
                where: {
                    dia: {
                        [Op.lt]: dataComparada,
                        [Op.gte]: dataComparada2
                    }
                }
            });

            return httpHelper.ok(reservas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetTrimestreUmReservaController();
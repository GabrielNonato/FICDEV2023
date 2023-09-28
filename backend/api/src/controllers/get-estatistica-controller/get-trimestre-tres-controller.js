const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');
const { Op } = require("sequelize");

class GetTrimestreTresReservaController {
       
    async getTrimestreTresReservas(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const dataAtual = new Date()
            const dataAno = dataAtual.getFullYear();
            const dataComparada = dataAno+'-09-01'
            const dataComparada2 = dataAno+'-06-01'

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

module.exports = new GetTrimestreTresReservaController();
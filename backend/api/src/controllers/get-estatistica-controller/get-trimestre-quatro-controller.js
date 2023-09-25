const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');
const { Op } = require("sequelize");

class GetTrimestreQuatroReservaController {
       
    async getTrimestreQuatroReservas(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const dataAtual = new Date()
            const dataAno = dataAtual.getFullYear();
            const dataComparada = dataAno+'-12-31'
            const dataComparada2 = dataAno+'-09-01'

            const reservas = await ReservaModel.count({
                where: {
                    dia: {
                        [Op.lte]: dataComparada,
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

module.exports = new GetTrimestreQuatroReservaController();
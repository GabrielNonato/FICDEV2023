const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');
const { Op } = require("sequelize");

class GetReservaNoturnoController {
       
    async getReservaNoturno(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const reservas = await ReservaModel.count({
                where: {
                    horarioFim: {
                        [Op.lte]: '12:00:00'
                    }
                }
            });

            return httpHelper.ok(reservas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetReservaNoturnoController();
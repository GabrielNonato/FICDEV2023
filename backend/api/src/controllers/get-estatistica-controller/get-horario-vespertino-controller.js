const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');
const { Op } = require("sequelize");

class GetReservaVespertinoController {
       
    async getReservaVespertino(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const reservas = await ReservaModel.count({
                where: {
                    horarioFim: {
                        [Op.and]:{
                            [Op.lte]: '17:00:00',
                            [Op.gte]: '13:00:00'
                        }
                    }
                }
            });

            return httpHelper.ok(reservas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetReservaVespertinoController();
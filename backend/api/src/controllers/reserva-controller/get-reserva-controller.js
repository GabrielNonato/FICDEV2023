const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');

class GetReservaController {
       
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const reservas = await ReservaModel.findAll();
            return httpHelper.ok(reservas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetReservaController();
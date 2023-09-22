const { HttpHelper } = require('../../utils/http-helper');
const { ReservaModel } = require('../../models/reserva-model');

class GetQuantidadeReservaController {
       
    async getQuantidadeReservas(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const quantidade = await ReservaModel.count();
            return httpHelper.ok(quantidade);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetQuantidadeReservaController();
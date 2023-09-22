const { HttpHelper } = require('../../utils/http-helper');
const { SalaModel } = require('../../models/sala-model');

class GetQuantidadeSalaController {
       
    async getQuantidadeSalas(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const quantidade = await SalaModel.count();
            return httpHelper.ok(quantidade);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetQuantidadeSalaController();
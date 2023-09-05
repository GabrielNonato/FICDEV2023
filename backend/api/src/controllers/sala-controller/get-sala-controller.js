const { HttpHelper } = require('../../utils/http-helper');
const { SalaModel } = require('../../models/sala-model');

class GetSalaController {
       
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const salas = await SalaModel.findAll();
            return httpHelper.ok(salas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetSalaController();
const { SalaModel } = require('../../models/sala-model');
const { HttpHelper } = require('../../utils/http-helper');

class CreateSalaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome,departamento,capacidade } = request.body;

            if (!nome) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!departamento) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!capacidade) return httpHelper.badRequest('Parâmetros inválidos!');

            const sala = await SalaModel.create({
                nome,departamento,capacidade
            });

            return httpHelper.created(sala);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new CreateSalaController();

const { Op } = require("sequelize");
const { HttpHelper } = require('../../utils/http-helper');
const { SalaModel } = require('../../models/sala-model');

class GetFiltroSalaController {
    async getCapacidade(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { capacidade } = request.params;
            if (!capacidade) return httpHelper.badRequest('Parâmetros inválidos!');
            const salas = await SalaModel.findAll({
                where: {capacidade:{
                    [Op.gte]:capacidade
                }}
            });
            return httpHelper.ok(salas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetFiltroSalaController();
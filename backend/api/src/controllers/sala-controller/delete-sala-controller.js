const { HttpHelper } = require('../../utils/http-helper');
const { SalaModel } = require('../../models/sala-model');
const { ReservaModel } = require('../../models/reserva-model')
const { Op } = require("sequelize");

class DeleteSalaController {
       
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;

            const restricao = await ReservaModel.findAll({where: {
                SalaId:{
                    [Op.eq]: id
                }
            }})

            if(restricao[0]) return httpHelper.badRequest("Solicitação negada. Ainda há reservas utilizando esta sala")

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const salaExists = await SalaModel.findOne({ where: { id } });
            if (!salaExists) return httpHelper.notFound('Sala não encontrada!');
            
            await SalaModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Sala deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new DeleteSalaController();
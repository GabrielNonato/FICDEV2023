const { SalaModel } = require('../../models/sala-model');
const { HttpHelper } = require('../../utils/http-helper');

class UpdateSalaController {
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome, departamento, capacidade } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!nome) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!departamento) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!capacidade) return httpHelper.badRequest('Parâmetros inválidos!');

            const salaExiste = await SalaModel.findOne({
                where:{
                    nome:nome
                }
            })

            if(salaExiste) return httpHelper.badRequest('Nome já utilizado por outra sala')

            const salaExists = await SalaModel.findByPk(id);
            if (!salaExists) return httpHelper.notFound('Sala não encontrada!');
            await SalaModel.update({
                nome, departamento, capacidade
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Sala atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new UpdateSalaController();

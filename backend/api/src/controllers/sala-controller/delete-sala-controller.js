const { HttpHelper } = require('../../utils/http-helper');
const { UsuarioModel } = require('../../models/sala-model');

class DeleteSalaController {
       
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
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
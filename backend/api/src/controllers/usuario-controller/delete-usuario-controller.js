const { HttpHelper } = require("../../utils/http-helper"); 
const { UsuarioModel } = require('../../models/usuario-model');

class DeleteUsuarioController {
       
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const UsuarioExists = await UsuarioModel.findOne({ where: { id } });
            if (!UsuarioExists) return httpHelper.notFound('Usuario não encontrado!');
            await UsuarioModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Usuario deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new DeleteUsuarioController();
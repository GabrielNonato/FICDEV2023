const { HttpHelper } = require('../../utils/http-helper');
const { UsuarioModel } = require('../../models/usuario-model');

class GetUsuarioController {
       
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuario = await UsuarioModel.findByPk(id);
            return httpHelper.ok(usuario);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new GetUsuarioController();
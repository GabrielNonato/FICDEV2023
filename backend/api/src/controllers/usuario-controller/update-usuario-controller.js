const { UsuarioModel } = require('../../models/usuario-model');
const { HttpHelper } = require('../../utils/http-helper');
const bcrypt = require('bcrypt');

class UpdateUsuarioController {
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { email, senha, nome } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!email) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!senha) return httpHelper.badRequest('Parâmetros inválidos!');
            if (!nome) return httpHelper.badRequest('Parâmetros inválidos!');

            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );

            const usuarioExists = await UsuarioModel.findByPk(id);
            if (!usuarioExists) return httpHelper.notFound('Usuario não encontrada');
            await UsuarioModel.update({
                email, 
                senha:senhaHashed, 
                nome
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Usuario atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new UpdateUsuarioController();

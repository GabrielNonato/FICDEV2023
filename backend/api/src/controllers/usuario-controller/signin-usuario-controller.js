const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpHelper } = require("../../utils/http-helper"); 

const { UsuarioModel } = require('../../models/usuario-model');
const { TOKEN_SECRET } = require('../../../environments');

/**
 * Entra com o usuário e retorna um token de acesso
 */
class SigninUsuarioController {
    async signin(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, senha } = request.body;
            if (!email || !senha) return httpHelper.badRequest('E-mail e senha são obrigatórios!');

            const usuarioExists = await UsuarioModel.findOne({ where: { email } });
            
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');
            const isPasswordValid = await bcrypt.compare(senha, usuarioExists.senha);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: usuarioExists.id },
                `${process.env.TOKEN_SECRET}`,
                { expiresIn: 36000 }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new SigninUsuarioController();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpHelper } = require("../../utils/http-helper"); 

const { UsuarioModel } = require('../../models/usuario-model');


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

            if (!usuarioExists) return httpHelper.notFound('Email ou senha incorretos!');
            const isSenhaValid = await bcrypt.compare(senha, usuarioExists.senha);

            if (!isSenhaValid) return httpHelper.badRequest('Email ou senha incorretos!');
            const accessToken = jwt.sign(
                { id: usuarioExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );

            return httpHelper.ok({ 
                accessToken,
                idUsuario: usuarioExists.id
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new SigninUsuarioController();

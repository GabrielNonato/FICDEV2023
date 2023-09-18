const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpHelper } = require('../../utils/http-helper');
const { UsuarioModel } = require('../../models/usuario-model');

/**
 * Criar usuário e retorna um token de acesso
 */
class SignupUsuarioController {
    async signup(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, senha, nome } = request.body;
            if (!email || !senha ) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            if (!nome) return httpHelper.badRequest('nome é obrigatórios!');

            const usuarioAlreadyExists = await UsuarioModel.findOne({ where: { email } });
            if (usuarioAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');

            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );

            const usuario = await UsuarioModel.create({
                email,
                senha: senhaHashed,
                nome
            });

            if (!usuario) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: usuario.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );

            return httpHelper.created({ 
                accessToken,
                idUsuario: usuario.id
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new SignupUsuarioController();

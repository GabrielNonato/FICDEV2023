const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UsuarioModel } = require('../models/usuario-model');
const { TOKEN_SECRET } = require('../../environments');

/**
 * Entra com o usuário e retorna um token de acesso
 */
class SiginUsuarioController {
    async sigin(request, response) {
        try {
            const { email, senha } = request.body;

            // Validar parâmetros
            if (!email || !senha) {
                return response.status(400).json({
                    error: 'Email e senha são obrigatórios!'
                });
            }

            // Verifica se usuário existe
            const usuarioExists = await UsuarioModel.findOne({
                where: { email }
            });

            if (!usuarioExists) {
                return response.status(400).json({
                    error: 'Usuario não existe!'
                });
            }

            // Verifica se a senha está correta
            const isSenhaValid = await bcrypt.compare(senha, usuarioExists.senha);

            if (!isSenhaValid) {
                return response.status(400).json({
                    error: 'Senha incorreta!'
                });
            }

            // Gera token de acesso
            const accessToken = jwt.sign(
                { id: usuarioExists.id },
                TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            return response.status(200).json({
                accessToken
            });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }
}

module.exports = new SiginUsuarioController();

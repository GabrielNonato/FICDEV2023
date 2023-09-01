const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UsuarioModel } = require('../models/usuario-model');
const { TOKEN_SECRET, SALT } = require('../../environments');

/**
 * Criar usuário e retorna um token de acesso
 */
class SignupUsuarioController {
    async signup(request, response) {
        try {
            const { email, senha, nome } = request.body;

            // Validar parâmetros
            if (!email || !senha || !nome) {
                return response.status(400).json({
                    error: 'Todos os campos são obrigatórios!'
                });
            }

            // Criptografa senha
            const senhaHashed = await bcrypt.hash(senha, SALT);

            // Cria usuário
            const usuario = await UsuarioModel.create({
                email,
                senha: senhaHashed,
                nome,
            });

            if (!usuario) {
                return response.status(400).json({
                    error: 'Houve um erro ao criar usuário'
                });
            }

            // Gera e retorna access token
            const accessToken = jwt.sign(
                { id: usuario.id },
                TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            return response.status(201).json({
                accessToken
            });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }
}

module.exports = new SignupUsuarioController();

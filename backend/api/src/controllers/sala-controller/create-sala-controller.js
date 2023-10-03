const { SalaModel } = require('../../models/sala-model');
const { HttpHelper } = require('../../utils/http-helper');

class CreateSalaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome,departamento,capacidade } = request.body;

            if (!nome) return httpHelper.badRequest('Nome inválido!');
            if (!departamento) return httpHelper.badRequest('Departamento inválido!');
            if (!capacidade || capacidade<1) return httpHelper.badRequest('Capacidade inválida!');

            const salaExiste = await SalaModel.findOne({
                where:{
                    nome:nome
                }
            })

            if(salaExiste) return httpHelper.badRequest('Nome já utilizado por outra sala')

            const sala = await SalaModel.create({
                nome,departamento,capacidade
            });

            return httpHelper.created(sala);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = new CreateSalaController();

const { NutritionistModel } = require('../models/nutritionist-model');

/**
 * Cria nutricionista e retorna a nutricionista
 */
class CreateNutritionistController {
    async create(request, response) {
        try {
            const { userId } = request;
            const { crn } = request.body;

            // Verifica CRN
            if (!crn) {
                return response.status(400).json({
                    error: 'CRN é obrigatório!'
                });
            }

            // Verifica se já existe nutricionista cadastrada com o mesmo CRN
            const nutritionistAlreadyExists = await NutritionistModel.findOne({
                where: { crn }
            });

            if (nutritionistAlreadyExists) {
                return response.status(400).json({
                    error: 'CRN já cadastrado!'
                });
            }

            // Cria Nutricionista
            const nutritionist = await NutritionistModel.create({
                crn,
                userId
            });

            return response.status(201).json(nutritionist);
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }
}

module.exports = new CreateNutritionistController();

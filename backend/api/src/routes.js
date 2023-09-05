const { Router } = require('express');

const SignupUsuarioController = require('./controllers//signup-usuario-controller');
const SigninUsuarioController = require('./controllers/signin-usuario-controller');

const CreateSalaController = require('./controllers/sala-controller/create-sala-controller');
const UpdateSalaController = require('./controllers/sala-controller/update-sala-controller');
const DeleteSalaController = require('./controllers/sala-controller/delete-sala-controller');
const GetSalaController = require('./controllers/sala-controller/get-sala-controller');
const GetFiltroSalaController = require('./controllers/sala-controller/get-filtro-sala-controller')

const { authMiddleware } = require('./middlewares/auth-middleware');

const routes = Router();

// Users
routes.post('/usuario/signup', SignupUsuarioController.signup);
routes.post('/usuario/signin', SigninUsuarioController.signin);

// Sala
routes.post('/sala/create', authMiddleware, CreateSalaController.create);
routes.put('/sala/update/:id', authMiddleware ,UpdateSalaController.update);
routes.delete('/sala/delete/:id', authMiddleware , DeleteSalaController.delete);
routes.get('/salas', authMiddleware, GetSalaController.getAll);
routes.get('/sala/filtro/:capacidade',authMiddleware,GetFiltroSalaController.getCapacidade);

module.exports = { routes };

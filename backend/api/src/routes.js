const { Router } = require('express');

const GetQuantidadeSalas = require('./controllers/get-estatistica-controller/get-total-salas-controller')
const GetQuantidadeReservas = require('./controllers/get-estatistica-controller/get-total-reservas-controller')
const GetReservaAnoController = require('./controllers/get-estatistica-controller/get-reservas-no-ano-controller')
const GetReservaMatutinoController = require('./controllers/get-estatistica-controller/get-horario-matutino-controller')
const GetReservaVespertinoController = require('./controllers/get-estatistica-controller/get-horario-vespertino-controller')
const GetReservaNoturnoController = require('./controllers/get-estatistica-controller/get-horario-noturno-controller')

const SignupUsuarioController = require('./controllers/usuario-controller/signup-usuario-controller');
const SigninUsuarioController = require('./controllers/usuario-controller/signin-usuario-controller');
const DeleteUsuarioController = require('./controllers/usuario-controller/delete-usuario-controller');
const UpdateUsuarioController = require('./controllers/usuario-controller/update-usuario-controller');
const GetUsuarioController = require('./controllers/usuario-controller/get-usuario-controller')

const CreateSalaController = require('./controllers/sala-controller/create-sala-controller');
const UpdateSalaController = require('./controllers/sala-controller/update-sala-controller');
const DeleteSalaController = require('./controllers/sala-controller/delete-sala-controller');
const GetSalaController = require('./controllers/sala-controller/get-sala-controller');
const GetFiltroSalaController = require('./controllers/sala-controller/get-filtro-sala-controller');

const CreateReservaController = require('./controllers/reserva-controller/create-reserva-controller')
const DeleteReservaController = require('./controllers/reserva-controller/delete-reserva-controller')
const GetReservaController = require('./controllers/reserva-controller/get-reserva-controller')
const UpdateReservaController = require('./controllers/reserva-controller/update-reserva-controller')
const GetFiltroReservaController = require('./controllers/reserva-controller/get-filtro-reserva-controller')

const { authMiddleware } = require('./middlewares/auth-middleware');

const routes = Router();

// Usuarios
routes.post('/usuario/signup', SignupUsuarioController.signup);
routes.post('/usuario/signin', SigninUsuarioController.signin);
routes.delete('/usuario/delete/:id', authMiddleware, DeleteUsuarioController.delete)
routes.put('/usuario/update/:id', authMiddleware, UpdateUsuarioController.update)
routes.get('/usuario/:id', authMiddleware, GetUsuarioController.getAll)

// Sala
routes.post('/sala/create', authMiddleware, CreateSalaController.create);
routes.put('/sala/update/:id', authMiddleware ,UpdateSalaController.update);
routes.delete('/sala/delete/:id', authMiddleware , DeleteSalaController.delete);
routes.get('/salas', authMiddleware, GetSalaController.getAll);
routes.get('/sala/filtro/:capacidade',authMiddleware,GetFiltroSalaController.getCapacidade);

// Reserva
routes.post('/reserva/create', authMiddleware, CreateReservaController.create);
routes.put('/reserva/update/:id', authMiddleware ,UpdateReservaController.update);
routes.delete('/reserva/delete/:id', authMiddleware , DeleteReservaController.delete);
routes.get('/reservas', authMiddleware, GetReservaController.getAll);
routes.get('/reserva/filtro/:dia',authMiddleware,GetFiltroReservaController.getDia);

//Graficos
routes.get('/sala/quantidade',  GetQuantidadeSalas.getQuantidadeSalas)
routes.get('/reserva/quantidade',  GetQuantidadeReservas.getQuantidadeReservas)
routes.get('/reserva/ano',  GetReservaAnoController.getAnoReservas)
routes.get('/reserva/matutino', GetReservaMatutinoController.getReservaMatutino)
routes.get('/reserva/vespertino', GetReservaVespertinoController.getReservaVespertino)
routes.get('/reserva/noturno', GetReservaNoturnoController.getReservaNoturno)


module.exports = { routes };

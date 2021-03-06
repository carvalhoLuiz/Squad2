import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import GestorController from './app/controllers/Gestor/GestorController';
import SessionController from './app/controllers/SessionController';
import FuncionarioController from './app/controllers/Usuario/FuncionarioController';
import GestorConviteController from './app/controllers/Gestor/GestorConviteController';
import UploadUsuarioController from './app/controllers/UploadImagem/UploadUsuarioController';
import ProjetoController from './app/controllers/Projeto/ProjetoController';
import SquadUsuarioController from './app/controllers/Squad/SquadUsuarioController';
import NotificacaoController from './app/controllers/Notificacao/NotificacaoController';
import TarefaController from './app/controllers/Tarefa/TarefaController';
import UsuarioTarefaController from './app/controllers/Usuario/UsuarioTarefaController';
import NotificacaoSquadTarefaController from './app/controllers/Notificacao/NotificacaoSquadTarefaController';
import NotificacaoUsuarioTarefaController from './app/controllers/Notificacao/NotificacaoUsuarioTarefaController';
import SquadTarefaController from './app/controllers/Squad/SquadTarefaController';
import SquadController from './app/controllers/Squad/SquadController';
import TimesheetController from './app/controllers/Timesheet/TimesheetController';
import CargoController from './app/controllers/Cargo/CargoController';
import SquadTarefaUsuarioController from './app/controllers/Squad/SquadTarefaUsuarioController';
import UsuarioTarefaConcluidaController from './app/controllers/Usuario/UsuarioTarefaConcluidaController';

import Authentication from './app/middlewares/Auth';
import AuthTipoDeUsuario  from './app/middlewares/AuthTipoDeUsuario';
import UsuariosPertecenteAoGestor from './app/controllers/Gestor/UsuariosPertecenteAoGestor';
import UsuarioNomeController from './app/controllers/Usuario/UsuarioNomeController';


const routes = new Router();
const upload = multer(uploadConfig);

// Rota Session
routes.post('/session', SessionController.store);

// Rota Cargos
routes.get('/cargos', CargoController.index);

// Rota Gestor - Cria um usuário do tipo gestor
routes.post('/gestor', GestorController.store);


// Rota Funcionario - Apenas usuários que recebem o link de cadastro gerado pelo gestor
routes.post('/convite', FuncionarioController.store);


/*      
                        Autenticação - JWT
   Todas as rotas que forem criadas depois do routes.use(Authentication.store).
   Terá a autenticação, obrigando o usuário a estar logado.
*/
routes.use(Authentication.store);

// Retorna nome_social
routes.get('/nome', UsuarioNomeController.index);

// Squad
routes.get('/squad', SquadController.index);


// Tarefa 
routes.get('/tarefa', TarefaController.index);
routes.put('/tarefa/:id', TarefaController.update);
// Editar Tarefa concluida
routes.put('/concluirtarefa/:id', UsuarioTarefaConcluidaController.update);


// Listagem de tarefas da squad
routes.get('/squadtarefausuario', SquadTarefaUsuarioController.index);

// Listagem de tarefas do usuário
routes.get('/usuariotarefa', UsuarioTarefaController.index);


// Rota Notificacao
routes.get('/notificacao', NotificacaoController.index);
routes.put('/notificacao/:id', NotificacaoController.update);
routes.delete('/notificacao/:id', NotificacaoController.delete);
// Rota para testar inclusão de notificacao
routes.post('/notificacao', NotificacaoController.store);


// Rota Notificacao Squad Tarefa
routes.get('/notificacaosquad', NotificacaoSquadTarefaController.index);
routes.put('/notificacaosquad/:id', NotificacaoSquadTarefaController.update);
routes.delete('/notificacaosquad/:id', NotificacaoSquadTarefaController.delete);
// Rota para testar inclusão de notificacao para squad
routes.post('/notificacaosquad', NotificacaoSquadTarefaController.store);


// Rota Notificacao Usuario Tarefa
routes.get('/notificacaousuario', NotificacaoUsuarioTarefaController.index);
routes.put('/notificacaousuario/:id', NotificacaoUsuarioTarefaController.update);
routes.delete('/notificacaousuario/:id', NotificacaoUsuarioTarefaController.delete);
// Rota para testar inclusão de notificacao para squad
routes.post('/notificacaousuario', NotificacaoSquadTarefaController.store);


// Rota Funcionario
routes.get('/funcionario', FuncionarioController.index);
routes.put('/funcionario', FuncionarioController.update);


// Rota timesheet
routes.get('/timesheet', TimesheetController.index);
routes.post('/timesheet', TimesheetController.store);
routes.put('/timesheet', TimesheetController.update);


// Rota de Upload da Imagem dos usuários
routes.get('/uploadusuario', UploadUsuarioController.show);
routes.post('/uploadusuario', upload.single("img_usuario"), UploadUsuarioController.store);


/*      
                        Autenticação - Tipo de usuário
   Todas as rotas que forem criadas depois do routes.use(AuthTipoDeUsuario.store),
   Só poderão ser acessadas por usuários que não sejam do tipo id_tipousuario = 3
*/
routes.use(AuthTipoDeUsuario.store);

// UsuariosPertecenteAoGestor
routes.use('/meusfuncionarios', UsuariosPertecenteAoGestor.index);

// Gestor
routes.get('/gestor', GestorController.index);
routes.put('/gestor', GestorController.update);


// Rota Convite - Gera o link de cadastro para funcionarios
routes.get('/convite', GestorConviteController.show);
routes.post('/convidar', GestorConviteController.store);


// Rota Projeto
routes.post('/projeto', ProjetoController.store);
routes.get('/projeto', ProjetoController.index);
routes.put('/projeto/:id', ProjetoController.update);
routes.delete('/projeto/:id', ProjetoController.delete);


// Rota Squad Usuario
routes.get('/squadusuario', SquadUsuarioController.index);
routes.post('/squadusuario', SquadUsuarioController.store);
routes.put('/squadusuario/:id', SquadUsuarioController.update);
routes.delete('/squadusuario/:id', SquadUsuarioController.delete);


// Rota tarefa
routes.post('/tarefa', TarefaController.store);
routes.delete('/tarefa/:id', TarefaController.delete);


// Rota para atribuir tarefas ao usuario
routes.post('/usuariotarefa', UsuarioTarefaController.store);
routes.put('/usuariotarefa/:id', UsuarioTarefaController.update);
routes.delete('/usuariotarefa/:id', UsuarioTarefaController.delete);


// Rota Squad Tarefa
routes.get('/squadtarefa', SquadTarefaController.index);
routes.post('/squadtarefa', SquadTarefaController.store);
routes.put('/squadtarefa/:id', SquadTarefaController.update);
routes.delete('/squadtarefa/:id', SquadTarefaController.delete);


// Rota Squad
routes.post('/squad', SquadController.store);
routes.put('/squad/:id', SquadController.update);
routes.delete('/squad/:id', SquadController.delete);


export default routes;
const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

const { loginRequired } = require("./src/middlewares/middeware");

// Rotas da home
route.get("/", homeController.index);

// Rotas de login

route.get("/login/index", loginController.index);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);
route.get("/login/login/logout", loginController.logout);
route.post("/aluno/enviar", loginController.enviar);
route.post("/aluno/checar", loginController.checar);
route.post("/login/professor", loginController.loginProfessor);
route.post("/login/professor/login", loginController.login);
// Rotas de contato

route.get("/contato/index", loginRequired, contatoController.index);
route.post("/contato/register", loginRequired, contatoController.register);
route.get("/contato/index/:id", loginRequired, contatoController.editIndex);
route.post("/contato/edit/:id", loginRequired, contatoController.edit);
route.get("/contato/delete/:id", loginRequired, contatoController.delete);
route.get("/contato/login/logout", loginController.logout);
route.get("/contato/atividade/:id", loginRequired, contatoController.avaliar);

module.exports = route;

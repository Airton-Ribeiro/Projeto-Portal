const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const alunoController = require("./src/controllers/alunoController");
const multer = require("multer");
const upload = multer();

const { loginRequired } = require("./src/middlewares/middeware");

// Rotas da home
route.get("/", homeController.index);

// Rotas de login

route.get("/login/index", loginController.index);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);
route.get("/login/login/logout", loginController.logout);
route.post("/login/professor", loginController.loginProfessor);
route.post("/login/professor/login", loginController.login);
route.get("/aluno/index/login/logout", loginController.logout);
route.get("/aluno/atividade/login/logout", loginRequired, loginController.logout);


// Rotas de aluno
// route.post("/aluno/autentica", alunoController.alunoAutentica);
route.get("/aluno/autentica", alunoController.alunoAutentica);
route.post("/aluno/autenticado", alunoController.alunoAutenticado);
route.post("/aluno/checar", loginController.checar);
route.get("/aluno/enviar/:id", alunoController.enviar);
route.post("/aluno/enviar/att",  alunoController.uploadFile);
route.get("/aluno/index", loginRequired, alunoController.index);
route.post("/aluno/register", loginRequired, alunoController.register);
route.get("/aluno/index/:id", loginRequired, alunoController.editIndex);
route.post("/aluno/edit/:id", loginRequired, alunoController.edit);
route.get("/aluno/delete/:id", loginRequired, alunoController.delete);
route.get("/aluno/login/logout", loginController.logout);
route.get("/aluno/atividade/:id", loginRequired, alunoController.avaliar);
route.get("/alunos/index", loginRequired, homeController.alunos);
route.get("/alunos/login/logout", loginController.logout);



module.exports = route;

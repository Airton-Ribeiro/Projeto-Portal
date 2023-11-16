const Aluno = require('../models/AlunoModel')


exports.index = async (req, res) => {
    const alunos = await Aluno.buscaAlunos();
    res.render('index', { alunos });
};

exports.alunos = async (req, res) => {
    const alunos = await Aluno.buscaAlunos();
    res.render('alunos', { alunos });
};
const Aluno = require('../models/AlunoModel')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
});
exports.index = (req, res) => {
  res.render('aluno', {
    aluno: {}
  });
};


exports.register = async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.register();

    if (aluno.errors.length > 0) {
      req.flash('errors', aluno.errors);
      req.session.save(function () {
        return res.redirect('/aluno/index');
      });
      return;
    }

    req.flash('success', 'Seu contato foi salvo com sucesso');
    req.session.save(function () {
      return res.redirect(`/aluno/index/${aluno.aluno._id}`);
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }

};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const aluno = await Aluno.buscaPorId(req.params.id);
  if (!aluno) return res.render('404');
  res.render('aluno', { aluno });
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const aluno = new Aluno(req.body);
    await aluno.edit(req.params.id);

    if (aluno.errors.length > 0) {
      req.flash('errors', aluno.errors);
      req.session.save(function () {
        res.redirect(req.get('referer'));
      });
      return;
    }

    req.flash('success', 'Contato editado com sucesso.');
    req.session.save(() => res.redirect(`/aluno/index/${aluno.aluno._id}`));
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const aluno = await Aluno.delete(req.params.id);
  if (!aluno) return res.render('404');

  req.flash('success', 'Contato apagado com sucesso');
  req.session.save(() => res.redirect(`back`));
  return;
}

exports.alunoAutenticado = async (req, res) => {
  try {
    const matricula = req.body.matricula;
    let alunoObj = new Aluno(); // Use um nome diferente para evitar conflitos de nome
    const aluno = await alunoObj.buscaPorMatricula(matricula);

    if (alunoObj.errors.length > 0) {
      req.flash('errors', alunoObj.errors);
      req.session.save(function () {
        return res.redirect('/aluno/autentica');
      });
      return;
    }
    const nome = req.body.nome;
    const horas = req.body.horas; 
    const descr = req.body.descricao;
    await alunoObj.atualizarAtvd(aluno._id, nome, horas, descr);
    res.redirect(`/aluno/enviar/${aluno._id}`);
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.alunoAutentica = async (req, res) => {
  res.render('alunoAutentica') 
};

exports.enviar = async (req, res) => { 
  const aluno = await Aluno.buscaPorId(req.params.id);
  res.render('enviar', { aluno }); 

};

exports.avaliar = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const aluno = await Aluno.buscaPorId(req.params.id);
  if (!aluno) return res.render('404');
  res.render('atividade', { aluno });
};

exports.anexoEnviado = async (req, res) => {
  try {
    let alunoObj = new Aluno();
    const aluno = await Aluno.buscaPorId(req.params.id);
    alunoObj = aluno;

    const uploadPromise = new Promise((resolve, reject) => {
      upload.single('anexo')(req, res, (err) => {
        if (err) {
          console.error('Erro no upload do arquivo:', err);
          reject('Erro no upload do arquivo');
          return;
        }

        const nome = req.file.originalname;
        const dados = req.file.buffer;

        // Resolva a Promise com os dados do upload
        resolve({ nome, dados });
      });
    });

    const { nome, dados } = await uploadPromise;

    // Obter o último elemento do array de atividades
    const ultimaAtividade = aluno.atividades[aluno.atividades.length - 1];
  
    if (!ultimaAtividade) {
      console.error('Nenhuma atividade encontrada');
      res.status(400).send('Nenhuma atividade encontrada');
      return;
    }

    const idDaAtividade = ultimaAtividade._id;

    console.log('Dados do upload:', nome, dados);
    console.log('ID da atividade:', idDaAtividade);

    // Agora você pode usar idDaAtividade no método attAnexo
    await alunoObj.attAnexo(idDaAtividade, nome, dados);

    console.log('Upload de arquivo concluído com sucesso!');
    res.status(200).send('Upload de arquivo concluído com sucesso!');
  } catch (err) {
    console.error('Erro no upload do arquivo:', err);
    res.status(500).send('Erro no upload do arquivo');
  }
};


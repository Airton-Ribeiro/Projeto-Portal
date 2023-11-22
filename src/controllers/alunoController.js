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

exports.alunoAutentica = async (req, res) => {
  res.render('alunoAutentica');
  autenticar = () => {
    const matricula = req.body.input_matricula;
              const aluno =  Aluno.buscaPorMatricula(matricula);
              if(aluno){
                res.redirect(`aluno/enviar/${aluno.aluno._id}`);
              } 
  }
};

exports.enviar = async (req, res) => {
  const matricula = req.body.matricula;
  const aluno = await Aluno.buscaPorMatricula(matricula);
  console.log(aluno);
  if (!aluno) return res.render('404');
  
  res.render('enviar', { myObj: path });
};

exports.avaliar = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const aluno = await Aluno.buscaPorId(req.params.id);
  if (!aluno) return res.render('404');
  res.render('atividade', { aluno });
};


//Tentativa de download de arquivo CTRL+click no "uploadFile" de baixo pra ir para a função no AlunoModel
exports.uploadFile = async (req, res) => {
  try {
    const matricula = req.body.matricula;
    console.log(matricula)
    const uploadMiddleware = upload.single('anexo');
    console.log(req.body.matricula);
    const aluno = await Aluno.buscaPorMatricula(matricula);
    if(!aluno){
      return res.render('404');
    }
    // Chama o método uploadArquivo do modelo passando a matrícula
    await Aluno.uploadArquivo(req, res, aluno, uploadMiddleware);
  } catch (err) {
    console.error('Erro no upload do arquivo:', err);
    res.status(500).send('Erro no upload do arquivo');
  }
};

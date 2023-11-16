const Aluno = require('../models/AlunoModel')

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

exports.avaliar = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const aluno = await Aluno.buscaPorId(req.params.id);
  if (!aluno) return res.render('404');
  res.render('atividade', { aluno });
};



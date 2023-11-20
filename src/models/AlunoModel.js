const mongoose = require('mongoose');
const validator = require('validator');
const multer = require('multer');
const { cache } = require('ejs');

const AtividadeSchema = new mongoose.Schema({
  nomeAtt: { type: String, required: false, default: '' },
  descricao: { type: String, required: false, default: '' },
  horas: { type: Number, required: false, default: '0' },
  anexo: {
    nome: { type: String, required: false, default: '' },
    dados: Buffer,
  },
  criadoEm: { type: Date, default: Date.now },
});


const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default: '' },
  matricula: { type: Number, required: true, default: '' },
  curso: { type: String, required: true, default: '' },
  turno: { type: String, required: true, default: '' },
  criadoEm: { type: Date, default: Date.now },
  atividades: [AtividadeSchema],
});

const AlunoModel = mongoose.model('Aluno', AlunoSchema);

class Aluno {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.aluno = null;
  }



  async register() {
    this.valida();

    // await this.alunoExists();

    if (this.errors.length > 0) return;
    this.aluno = await AlunoModel.create(this.body);

  }

  valida() {
    this.cleanUp();

    // Validação
    // O e-mail precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    // A senha precisa ter de 3 a 6 digitos
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if (!this.body.matricula) this.errors.push('Matrícula é um campo obrigatório');
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      nome: this.body.nome,
      curso: this.body.curso,
      email: this.body.email,
      matricula: this.body.matricula,
      turno: this.body.turno,
      horas: this.body.horas,
    }
  }
  async alunoExists() {
    this.user = await Aluno
    Model.findOne({ nome: this.body.nome });
    this.matricula = await Aluno
    Model.findOne({ matricula: this.body.matricula });
    this.email = await Aluno
    Model.findOne({ email: this.body.email });
    this.curso = await Aluno
    Model.findOne({ curso: this.body.curso });
    this.turno = await Aluno
    Model.findOne({ turno: this.body.turno });
    if (this.user && this.email && this.matricula) this.errors.push('Usuário já existe.');
  }
  async edit(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.aluno = await AlunoModel.findByIdAndUpdate(id, this.body, { new: true });
  }


  // Métodos Estáticos.
  static async buscaPorId(id) {
    if (typeof id !== 'string') return;
    const aluno = await AlunoModel.findById(id);
    return aluno;
  };

  static async buscaAlunos() {
    const alunos = await AlunoModel.find()
      .sort({ criadoEm: -1 });
    return alunos;
  };
  static async delete(id) {
    if (typeof id !== 'string') return;
    const aluno = await AlunoModel.findOneAndDelete({ _id: id });
    return aluno;
  }


  //Upload de arquivos CHECAR

  async uploadFile(req, res) {
    const storage = multer.memoryStorage();//Salvando  buffer na memória
    const upload = multer({ storage: storage })//Onde salvar o arquivo (não entendi o storage:storage também :p)

    upload.single('anexo'), async (req, res) => { //pegando o upload direto da tela envio, onde o campo de file se chama "anexo"
      try {
        const anexo = new File({
          name: req.anexo.nome,
          data: req.anexo.dados
        })
        await anexo.save();
        res.send('Arquivo aberto')
      } catch (err) {
        res.status(500).send(err.message)
      }
    }
  }
}


module.exports = Aluno;
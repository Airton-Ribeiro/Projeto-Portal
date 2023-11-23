const mongoose = require('mongoose');
const validator = require('validator');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
});
const { cache } = require('ejs');

const AtividadeSchema = new mongoose.Schema({
  nomeatt: { type: String, required: false, default: '' },
  descricao: { type: String, required: false, default: '' },
  horas: { type: Number, required: false, default: '0' },
  anexo: {
    nome: { type: String, required: false, default: '' },
    dados: Buffer,
  },
  status: { type: String, required: false, default: 'Avaliando...' },
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

AlunoSchema.methods.attAnexo = async function (atividadeId, nome, dados) {
  const novoAnexo = {
    nome: nome,
    dados: dados,
  };
  
  // Encontrar a atividade específica pelo _id
  const atividade = this.atividades.id(atividadeId);
  
  if (!atividade) {
    console.error('Atividade não encontrada');
    return null; // Ou você pode lançar um erro, dependendo do seu tratamento de erro desejado
  }

  // Atualizar o anexo da atividade específica
  atividade.anexo = novoAnexo;

  // Salvar as alterações no documento
  const alunoAtualizado = await this.save();
  
  return alunoAtualizado;
};
AlunoSchema.methods.mudaStatus = async function (status) {
  try {
    // Usa 'this._id' para obter o ID da instância
    const alunoAtualizado = await AlunoModel.findOneAndUpdate(
      { 'atividades._id': this._id },
      { $set: { 'atividades.$.status': status } },
      { new: true }
    );

    return alunoAtualizado;
  } catch (error) {
    throw error;
  }
};


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
  static async buscaPorATT(id) {
    if (typeof id !== 'string') return;
    const aluno = await AlunoModel.findOne({ 'atividades._id': id });

    if (!aluno) {
        return null; // Ou algo apropriado para indicar que o aluno não foi encontrado
    }

    return aluno.atividades; // Retorna diretamente a lista de atividades
};
static async buscaPorDownload(id) {
  if (typeof id !== 'string') return;
    const aluno = await AlunoModel.findOne({ 'atividades._id': id });

    if (!aluno || !aluno.atividades) {
        return null;
    }

    // Encontrar a atividade específica com base no ID fornecido
    const atividade = aluno.atividades.find((a) => a._id.toString() === id);

    console.log(atividade); // Adicione este log para verificar a atividade

    return atividade; // Retorna diretamente a lista de atividades
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

    async buscaPorMatricula(matricula) {
    if (isNaN(matricula)) this.errors.push('Matricula digitada não é um numero.');
      if (this.errors.length > 0) return;
    const aluno = await AlunoModel.findOne({ matricula: matricula });
    if (!aluno) this.errors.push('Aluno não cadastrado');
    if (this.errors.length > 0) return;
    return aluno
  };

  async invalidate(atividadeId) {
    const aluno = await AlunoModel.findOneAndUpdate(
      { 'atividades._id': atividadeId },
      { $set: { 'atividades.$.status': 'Inválido' } },
      { new: true }
    );
  
    return aluno;
  }
  async validate(atividadeId) {
    const aluno = await AlunoModel.findOneAndUpdate(
      { 'atividades._id': atividadeId },
      { $set: { 'atividades.$.status': 'Válida' } },
      { new: true }
    );
  
    return aluno;
  }

  async atualizarAtvd(id, nome, horas, descr) {
    const novaAtividade = {
      nomeatt: nome,  
      horas: horas,
      descricao: descr,
      status: 'Avaliando...',
    };
  
    const alunoAtualizado = await AlunoModel.findByIdAndUpdate(
      id,
      { $push: { atividades: novaAtividade } },
      { new: true }
    );
  
    return alunoAtualizado;
  };
  //Upload de arquivos CHECAR
   
}


module.exports = Aluno;
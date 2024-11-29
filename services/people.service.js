const people = [];

// Retorna todas as pessoas
const getPeople = (req, res) => {
  const formattedPeople = people.map((pessoa) => ({
    id: pessoa.id,
    nome: pessoa["0"]?.nome || pessoa.nome,
    nomeSocial: pessoa["0"]?.nomeSocial || pessoa.nomeSocial,
    cpf: pessoa["0"]?.cpf || pessoa.cpf,
    cnpj: pessoa["0"]?.cnpj || pessoa.cnpj,
    escola: pessoa["0"]?.escola || pessoa.escola,
    email: pessoa["1"]?.email || pessoa.email,
    telefone: pessoa["1"]?.telefone || pessoa.telefone,
    cep: pessoa["2"]?.cep || pessoa.cep,
    endereco: pessoa["2"]?.endereco || pessoa.endereco,
    cidade: pessoa["2"]?.cidade || pessoa.cidade,
    estado: pessoa["2"]?.estado || pessoa.estado,
  }));

  res.status(200).json({
    message: "Lista de pessoas retornada com sucesso.",
    people: formattedPeople,
  });
};

// Retorna uma pessoa pelo ID
const getPersonById = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({
      code: "PESSOA_NAO_ENCONTRADA",
      message: "Pessoa não encontrada.",
    });
  }

  res.status(200).json({
    message: "Pessoa encontrada com sucesso.",
    people: person,
  });
};

// Adiciona uma pessoa
const addPerson = (req, res) => {
  console.log("Requisição recebida no /add-person:", req.body);
  const person = req.body;

  if (
    !person[0]?.nome ||
    !person[0]?.cpf ||
    !person[0]?.escola ||
    !person[1]?.email ||
    !person[2]?.endereco ||
    !person[2]?.estado
  ) {
    return res.status(400).json({
      code: "CAMPOS_OBRIGATORIOS",
      message: "Campos obrigatórios estão faltando.",
    });
  }

  person.id = `${people.length + 1}`;
  people.push(person);

  console.log("Pessoa adicionada:", person);

  res.status(201).json({
    message: "Pessoa adicionada com sucesso!",
    people: person,
  });
};

const patchPeople = (req, res) => {
  const { id } = req.params;
  const person = req.body;

  if (!person) {
    return res.status(400).json({
      code: "CAMPOS_OBRIGATORIOS",
      message: "Todos os campos são obrigatórios.",
    });
  }

  const index = people.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      code: "PESSOA_NAO_ENCONTRADA",
      message: "Pessoa nao encontrada.",
    });
  }

  people[index] = { ...people[index], ...person };

  res.status(200).json({
    message: "Pessoa atualizada com sucesso.",
    people: people[index],
  });
};

const deletePeople = (req, res) => {
  const { id } = req.params;

  const index = people.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      code: "PESSOA_NAO_ENCONTRADA",
      message: "Pessoa nao encontrada.",
    });
  }

  people.splice(index, 1);

  res.status(200).json({
    message: "Pessoa excluida com sucesso.",
  });
};

module.exports = {
  getPeople,
  getPersonById,
  addPerson,
  patchPeople,
  deletePeople,
};

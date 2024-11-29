// Campos de formulário estáticos
const getFormFields = (req, res) => {
  const formFields = [
    {
      step: 1,
      title: "Dados Cadastrais",
      fields: [
        { label: "Nome", name: "nome", type: "text", required: true },
        {
          label: "Nome Social",
          name: "nomeSocial",
          type: "text",
          required: true,
        },
        {
          label: "CPF",
          name: "cpf",
          type: "text",
          required: true,
          mask: "000.000.000-00",
        },
        {
          label: "CNPJ",
          name: "cnpj",
          type: "text",
          required: true,
          mask: "00.000.000/0000-00",
        },
        {
          label: "Escola",
          name: "escola",
          type: "dropdown",
          required: true,
          options: ["Escola 1", "Escola 2", "Escola 3"],
        },
      ],
    },
    {
      step: 2,
      title: "Dados de Contato",
      fields: [
        {
          label: "Email",
          name: "email",
          type: "email",
          required: true,
          validations: { email: true },
        },
        {
          label: "Telefone",
          name: "telefone",
          type: "text",
          required: true,
          mask: "(00) 00000-0000",
        },
      ],
    },
    {
      step: 3,
      title: "Dados de Endereço",
      fields: [
        {
          label: "CEP",
          name: "cep",
          type: "text",
          required: true,
          mask: "00000-000",
        },
        {
          label: "Endereço",
          name: "endereco",
          type: "text",
          required: true,
        },
        {
          label: "Cidade",
          name: "cidade",
          type: "text",
          required: true,
        },
        {
          label: "Estado",
          name: "estado",
          type: "dropdown",
          required: true,
          options: ["SP", "RJ", "MG", "RS"],
        },
      ],
    },
  ];

  res.status(200).json({
    message: "Campos do formulário retornados com sucesso.",
    formFields,
  });
};

module.exports = { getFormFields };

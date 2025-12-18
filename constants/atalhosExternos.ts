export interface AtalhoExterno {
  nome: string;
  descricao: string;
  url: string;
  image: string;
}

export const ATALHOS_EXTERNOS: AtalhoExterno[] = [
  {
    nome: "Estudante Online",
    descricao:
      "Envio e acompanhamento de tarefas, avaliações e avisos dos professores.",
    url: "https://faponline.fapce.edu.br/?new_loc=%2Fultra%2Finstitution-page",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQag3EltrIoJ_e240iLixSgDCfMrVvfv5O4-Q&s",
  },
  {
    nome: "Conta Estudante",
    descricao:
      "Acompanhe eventos, cadastros e certificações internas dos eventos.",
    url: "https://conta.unifapce.edu.br/entrar",
    image:
      "https://static.vecteezy.com/system/resources/previews/009/655/955/original/books-reading-library-learning-education-book-icon-book-logo-new-design-free-vector.jpg",
  },
  {
    nome: "Portal das Disciplinas",
    descricao: "Veja notas, matrículas e relatórios financeiros.",
    url: "https://unifapce.edu.br/portal-academico/",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/114/009/large_2x/discipline-icon-style-vector.jpg",
  },
  {
    nome: "Repositório de Documentos",
    descricao: "Acesse calendários acadêmicos, de aulas e de avaliações.",
    url: "https://unifapce.edu.br/repositorio-academico/?_sft_tipos_repacademico=calendario-academico,calendario-de-aulas,calendario-de-avaliacoes",
    image:
      "https://img.freepik.com/fotos-premium/png-icone-de-pasta-de-documento-azul-adesivo-fundo-transparente_53876-948563.jpg",
  },
];

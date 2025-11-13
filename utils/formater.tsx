// Função para formatar a data: 2025-11-13 -> Quinta-feira, 13/11/2025
export const formatarDataComDiaSemana = (dataString: string) => {
  const data = new Date(dataString);
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const diaSemana = diasSemana[data.getDay()];
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${diaSemana}, ${dia}/${mes}/${ano}`;
};

  // Função para formatar a data: 2025-11-13 -> 13/11/2025
  export const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // meses começam do 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

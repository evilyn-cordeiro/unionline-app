export function formatarDataComDiaSemana(dataStr: string) {
  const [ano, mes, dia] = dataStr.split("-").map(Number);

  const data = new Date(ano, mes - 1, dia);

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
  const diaFormatado = String(dia).padStart(2, "0");
  const mesFormatado = String(mes).padStart(2, "0");

  return `${diaSemana}, ${diaFormatado}/${mesFormatado}`;
}

export const formatarData = (dataString: string) => {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};
